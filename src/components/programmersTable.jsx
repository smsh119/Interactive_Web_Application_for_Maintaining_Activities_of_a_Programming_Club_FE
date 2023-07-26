import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class ProgrammersTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (programmer) => (
        <Link to={`/profiles/${programmer.profileId}`}>{programmer.name}</Link>
      ),
    },
    { path: "sid", label: "Student ID" },
    { path: "rating", label: "CF Rating" },
    { path: "maxRating", label: "CF Max Rating" },
    { path: "solvedProblem", label: "CF solved problems" },
    { path: "totalContest", label: "CF Contest" },
  ];

  constructor() {
    super();
  }

  render() {
    const { programmers, onSort, sortColumn } = this.props;
    return (
      <Table
        data={programmers}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
        sl={true}
      />
    );
  }
}

export default ProgrammersTable;
