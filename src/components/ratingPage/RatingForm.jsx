import dayjs from "dayjs";
import Joi from "joi-browser";
import { Component } from "react";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import Input from "../common/input";
import Loading from "../common/loading";
import UserSelector from "../userSelector";

class RatingForm extends Component {
    state = {
        data: [
            {
                profileId: "",
                rank: "",
                panalties: "",
            },
        ],
        date: "",
        contestSetter: null,
        errors: {},
        users: {},
        programmersList: [],
        options: [],
        loading: true,
    };

    schema = {
        _id: Joi.optional(),
        list: Joi.array().items(
            Joi.object({
                profileId: Joi.string().required(),
                points: Joi.number().required(),
                panalties: Joi.number().required(),
            })
        ),
        date: Joi.date().required(),
        contestSetter: Joi.string().required(),
    };

    async componentDidMount() {
        try {
            const { data } = await http.get("/programmers/list");
            this.mapOptions(data);
            this.setState({ programmersList: data, loading: false });
        } catch (e) {
            console.log(e);
        }
    }

    mapToRequestModel = () => {
        const data = this.state.data;
        let lst = [];
        for (let x of data) {
            const points = x.rank ? 1000 - (x.rank - 1) * 20 : null;
            const profileId = x.profileId;
            const panalties = x.panalties;
            lst = [...lst, { points, profileId, panalties }];
        }
        const obj = {
            list: lst,
            date: this.state.date,
            contestSetter: this.state.contestSetter,
        };
        return obj;
    };

    doSubmit = async () => {
        const obj = this.mapToRequestModel();
        const error = this.validate(obj);
        if (error) {
            toast.error("Fill up every input field...");
        } else {
            try {
                await http.post("/vjudge", obj);
                window.location = "/rating";
            } catch (error) {
                console.log(error.response);
            }
        }
    };

    validate = (obj) => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(obj, this.schema, options);
        if (!error) return null;

        return error.details[0].message;
    };

    mapOptions = (data) => {
        let optns = [];
        for (let i = 0; i < data.length; i++) {
            optns.push({
                label:
                    data[i].profileId.name +
                    " | " +
                    data[i].sid +
                    " | " +
                    data[i].profileId.onlineJudgeHandle.vjudge,
                value: data[i].profileId._id,
            });
        }
        this.setState({ options: optns });
    };

    handleChange = ({ currentTarget: input }, index = 0) => {
        if (input.name === "date") {
            const date = dayjs(input.value).toISOString();
            this.setState({ date });
        } else {
            const data = [...this.state.data];
            const obj = { ...data[index] };
            obj[input.name] = input.value ? parseInt(input.value) : "";
            data[index] = obj;
            this.setState({ data });
        }
    };

    handleChangeForUserSelector = (e, name, index) => {
        if (index === "contestSetter") {
            this.setState({ contestSetter: e.profileId });
            return;
        }
        const data = [...this.state.data];
        const obj = { ...data[index] };
        obj[name] = e.profileId;
        data[index] = obj;
        this.setState({ data });
    };

    handleAddField = () => {
        const data = [...this.state.data];
        data.push({
            profileId: "",
            rank: "",
            panalties: "",
        });
        this.setState({ data });
    };

    handleDeleteField = () => {
        const data = [...this.state.data];
        data.pop();
        this.setState({ data });
    };

    renderDateFieldAndContestSetter = () => {
        return (
            <div className="row my-3">
                <div className="col-md-8">
                    <label htmlFor="date">Contest Date and Time :</label>
                    <input
                        name="date"
                        type="datetime-local"
                        onChange={this.handleChange}
                        style={{
                            width: "210px",
                            borderRadius: "10px",
                            marginLeft: "10px",
                            padding: "5px 10px",
                            color: "gray",
                            borderColor: "gray",
                        }}
                    />
                </div>
                <div className="col-md">
                    <UserSelector
                        placeholder="Contest Setter"
                        onChange={(e) =>
                            this.handleChangeForUserSelector(
                                e,
                                "profileId",
                                "contestSetter"
                            )
                        }
                        error={this.state.errors["profileId"]}
                        options={this.state.options}
                        users={this.state.programmersList}
                    />
                </div>
            </div>
        );
    };

    render() {
        if (this.state.loading) return <Loading />;
        const { data: fields } = this.state;
        return (
            <div>
                <h1>Standings</h1>
                {this.renderDateFieldAndContestSetter()}
                {fields.map((field, index) => {
                    return (
                        <div className="row" key={index}>
                            <div className="col mt-1">
                                <UserSelector
                                    placeholder="User"
                                    onChange={(e) =>
                                        this.handleChangeForUserSelector(
                                            e,
                                            "profileId",
                                            index
                                        )
                                    }
                                    error={this.state.errors["profileId"]}
                                    options={this.state.options}
                                    users={this.state.programmersList}
                                />
                            </div>
                            <div className="col">
                                <Input
                                    type={"number"}
                                    name={"rank"}
                                    label={""}
                                    value={field.rank}
                                    error={this.state.errors["points"]}
                                    onChange={(e) =>
                                        this.handleChange(e, index)
                                    }
                                    placeholder={"Rank"}
                                />
                            </div>
                            <div className="col">
                                <Input
                                    type={"number"}
                                    name={"panalties"}
                                    label={""}
                                    value={field.panalties}
                                    error={this.state.errors["panalties"]}
                                    onChange={(e) =>
                                        this.handleChange(e, index)
                                    }
                                    placeholder={"Solved Problems"}
                                />
                            </div>
                        </div>
                    );
                })}
                <div>
                    {fields.length > 1 && (
                        <button
                            className="btn btn-sm btn-danger mb-2"
                            onClick={this.handleDeleteField}
                            style={{ float: "right" }}
                        >
                            Delete Field
                        </button>
                    )}
                </div>
                <button
                    className="btn btn-sm custom-btn"
                    style={{ marginRight: "4px" }}
                    onClick={this.handleAddField}
                >
                    Add Fields
                </button>
                <button
                    className="btn btn-sm custom-btn"
                    onClick={this.doSubmit}
                >
                    Save
                </button>
            </div>
        );
    }
}

export default RatingForm;
