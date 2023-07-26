import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, data, onSort, sl = false }) => {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        onSort={onSort}
        sortColumn={sortColumn}
        sl={sl}
      />
      <TableBody data={data} columns={columns} sl={sl} />
    </table>
  );
};

export default Table;
