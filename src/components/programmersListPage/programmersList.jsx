import _ from "lodash";
import { Component } from "react";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import Loading from "../common/loading";
import SearchBox from "../common/searchBox";
import ProgrammersTable from "./programmersTable";

class ProgrammersList extends Component {
    state = {
        programmers: [],
        searchQuery: "",
        sortColumn: { path: "name", order: "asc" },
        loading: true,
    };

    mapProgrammersData = (data) => {
        const programmers = [];
        for (let i = 0; i < data.length; i++) {
            programmers.push({
                sid: data[i].sid,
                name: data[i].profileId.name,
                rating: data[i].profileId.codeforcesId.rating,
                maxRating: data[i].profileId.codeforcesId.maxRating,
                solvedProblem: data[i].profileId.codeforcesId.solvedProblem,
                totalContest: data[i].profileId.codeforcesId.totalContest,
                profileId: data[i].profileId._id,
                _id: data[i]._id,
            });
        }
        return programmers;
    };

    async componentDidMount() {
        try {
            const { data } = await http.get("/programmers");
            const programmers = this.mapProgrammersData(data);
            this.setState({ programmers, loading: false });
        } catch ({ response }) {
            toast.error(response.data);
            console.log(response);
        }
    }

    handleSearch = (query) => {
        this.setState({ searchQuery: query });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const {
            searchQuery,
            programmers: allProgrammers,
            sortColumn,
        } = this.state;

        let filtered = allProgrammers;
        if (searchQuery)
            filtered = allProgrammers.filter(
                (m) =>
                    m.name
                        .toLowerCase()
                        .startsWith(searchQuery.toLowerCase()) ||
                    m.sid.startsWith(searchQuery)
            );
        const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);
        return { totalCount: filtered.length, data: sorted };
    };

    render() {
        if (this.state.loading) return <Loading />;

        const { sortColumn } = this.state;
        const { data: programmers } = this.getPagedData();

        return (
            <div className="programmersListDiv">
                <SearchBox
                    value={this.state.searchQuery}
                    onChange={this.handleSearch}
                />

                <ProgrammersTable
                    programmers={programmers}
                    sortColumn={sortColumn}
                    onSort={this.handleSort}
                />
            </div>
        );
    }
}

export default ProgrammersList;
