import React, { Component } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import _ from "lodash";
import SearchBox from "./searchBox";
import { toast } from "react-toastify";
import ProgrammersTable from "./programmersTable";
import http from "../services/httpService";

class ProgrammersList extends Component {
  state = {
    programmers: [],
    currentPage: 1,
    pageSize: 2,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
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
      this.setState({ programmers });
    } catch ({ response }) {
      toast.error(response.data);
      console.log(response);
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      searchQuery,
      programmers: allProgrammers,
      sortColumn,
    } = this.state;

    let filtered = allProgrammers;
    if (searchQuery)
      filtered = allProgrammers.filter(
        (m) =>
          m.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.sid.startsWith(searchQuery)
      );
    // console.log(filtered);
    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);
    // const programmers = paginate(sorted, currentPage, pageSize);  //for pagination
    return { totalCount: filtered.length, data: sorted };
  };

  render() {
    const { length: count } = this.state.programmers;
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: programmers } = this.getPagedData();

    return (
      <div className="programmersListDiv">
        <SearchBox
          value={this.state.searchQuery}
          onChange={this.handleSearch}
        />

        {/* <p>Showing {totalCount} programmers in the datebase.</p> */}
        <ProgrammersTable
          programmers={programmers}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
        {/* <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        /> */}
      </div>
    );
  }
}

export default ProgrammersList;
