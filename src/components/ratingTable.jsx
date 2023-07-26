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
    { path: "vjudgeHandle", label: "Vjudge ID" },
    { path: "vjudge.rating", label: "Rating" },
    { path: "vjudge.totalPoints", label: "Total Points" },
    { path: "vjudge.totalPanalties", label: "Total Soved Problems" },
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

export default RatingTable;
