import React, { Component } from "react";
import _ from "lodash";
import SearchBox from "./searchBox";
import { toast } from "react-toastify";
import AdminsTable from "./adminsTable";
import { changeAdmin, getAllUsers } from "../services/userService";
import { getCurrentUser } from "../services/authService";
import Loading from "./common/loading";

class Admins extends Component {
  state = {
    programmers: [],
    searchQuery: "",
    sortColumn: { path: "isAdmin", order: "desc" },
    loading: true,
  };

  mapProgrammersData = (data) => {
    const programmers = [];
    for (let i = 0; i < data.length; i++) {
      programmers.push({
        sid: data[i].sid,
        name: data[i].profileId.name,
        isAdmin: data[i].isAdmin,
        profileId: data[i].profileId._id,
        _id: data[i]._id,
      });
    }
    return programmers;
  };

  async componentDidMount() {
    try {
      const { data } = await getAllUsers();
      const programmers = this.mapProgrammersData(data);
      this.setState({ programmers, loading: false });
    } catch ({ response }) {
      console.log(response);
      toast.error(response.data);
    }
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleToggle = (programmer) => {
    const programmers = [...this.state.programmers];
    const index = programmers.indexOf(programmer);
    programmers[index] = { ...programmers[index] };
    programmers[index].isAdmin = !programmers[index].isAdmin;
    try {
      this.setState({ programmers });
      const obj = {
        Id: programmer._id,
        isAdmin: programmers[index].isAdmin,
      };
      changeAdmin(obj);
    } catch ({ response }) {
      console.log(response);
      toast.error(response.data);
    }
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
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.isSuperAdmin)
      window.location = "/notFound";

    if (this.state.loading) return <Loading />;

    const { sortColumn } = this.state;
    const { data: programmers } = this.getPagedData();
    return (
      <div className="programmersListDiv">
        <SearchBox
          value={this.state.searchQuery}
          onChange={this.handleSearch}
        />

        <AdminsTable
          programmers={programmers}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onToggle={this.handleToggle}
        />
      </div>
    );
  }
}

export default Admins;
