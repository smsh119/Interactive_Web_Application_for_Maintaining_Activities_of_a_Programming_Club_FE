import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class RatingTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (programmer) => (
        <Link to={`/profiles/${programmer.profileId}`}>{programmer.name}</Link>
      ),
    },
    { path: "sid", label: "Student ID" },
    { path: "vjudge.rating", label: "Ratating" },
    { path: "vjudge.totalPanalties", label: "Total Panalties" },
    { path: "vjudge.totalPoints", label: "Total Points" },
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
      />
    );
  }
}

export default RatingTable;
