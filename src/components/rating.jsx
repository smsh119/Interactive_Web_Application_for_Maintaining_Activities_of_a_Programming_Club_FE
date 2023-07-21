import React, { Component } from "react";
import _ from "lodash";
import SearchBox from "./searchBox";
import { toast } from "react-toastify";
import RatingTable from "./ratingTable";
import http from "../services/httpService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

class RatingC extends Component {
  state = {
    programmers: [],
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
  };

  mapProgrammersData = (data, vjudgeData) => {
    let programmers = [];
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
        vjudgeHandle: data[i].profileId.onlineJudgeHandle.vjudge,
        vjudge: vjudgeData.filter((item) => {
          item.rating = Number(item.rating).toFixed(3);
          item.totalPoints = Number(item.totalPoints);
          item.totalPanalties = Number(item.totalPanalties);
          return item.profileId === data[i].profileId._id;
        })[0],
      });
    }
    programmers = programmers.filter((item) => item.vjudge);
    return programmers;
  };

  async componentDidMount() {
    try {
      const { data: vjudgeData } = await http.get("/vjudge");
      const { data: profileData } = await http.get("/programmers");
      const programmers = this.mapProgrammersData(profileData, vjudgeData);
      this.setState({ programmers });
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
    const { searchQuery, programmers: allProgrammers, sortColumn } = this.state;

    let filtered = allProgrammers;
    if (searchQuery)
      filtered = allProgrammers.filter(
        (m) =>
          m.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.sid.startsWith(searchQuery)
      );
    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);
    return { totalCount: filtered.length, data: sorted };
  };

  render() {
    const { sortColumn } = this.state;
    const { data: programmers } = this.getPagedData();

    const navigate = this.props.navigate;
    const isAdmin = getCurrentUser() ? getCurrentUser().isAdmin : false;

    return (
      <div className="programmersListDiv">
        <h1>Rating</h1>
        {isAdmin && (
          <button
            className="btn custom-btn"
            onClick={() => navigate("newRating")}
          >
            Add Contest
          </button>
        )}
        <SearchBox
          value={this.state.searchQuery}
          onChange={this.handleSearch}
        />

        <RatingTable
          programmers={programmers}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
      </div>
    );
  }
}
export function Rating(props) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <RatingC
      {...props}
      params={params}
      navigate={navigate}
      location={location}
    ></RatingC>
  );
}

export default Rating;
