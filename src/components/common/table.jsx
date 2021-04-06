import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

export default function Table(props) {
  const { columns, sorthColumn, onSort, data } = props;
  return (
    <div>
      <table className="table">
        <TableHeader
          columns={columns}
          sorthColumn={sorthColumn}
          onSort={onSort}
        />
        <TableBody columns={columns} data={data} />
      </table>
    </div>
  );
}
