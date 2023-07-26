import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Toggler from "./common/toggler";

class AdminsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (programmer) => (
        <Link to={`/profiles/${programmer.profileId}`}>{programmer.name}</Link>
      ),
    },
    { path: "sid", label: "Student ID" },
    {
      label: "Admin",
      key: "tickCross",
      path: "isAdmin",
      content: (programmer) => (
        <Toggler
          isAdmin={programmer.isAdmin}
          onClick={() => this.props.onToggle(programmer)}
        />
      ),
    },
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

export default AdminsTable;
