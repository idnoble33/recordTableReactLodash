import React, { Component } from "react";
import Table from "./common/table";

class RecordTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "email", label: "Email" },
    { path: "address", label: "Address" },
    { path: "country", label: "Country" },
    { path: "matrxUnits", label: "Matrx Units" },
    {
      key: "delete",
      content: (record) => (
        <button
          onClick={() => this.props.onDelete(record)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { records, onSort, sorthColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={records}
        sorthColumn={sorthColumn}
        onSort={onSort}
      />
    );
  }
}

export default RecordTable;
