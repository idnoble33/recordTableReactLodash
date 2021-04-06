import React, { Component } from "react";
import Pagination from "./common/pagination";
import { getRecords } from "../services/practiceData";
import { paginate } from "../utils/paginate";
import RecordTable from "./recordTable";
import SearchRecord from "../components/searchRecord";
import _ from "lodash";

class Records extends Component {
  state = {
    records: [],
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "name", order: "asc" },
  };
  componentDidMount() {
    this.setState({ records: getRecords() });
  }
  handleDelete = (record) => {
    const records = this.state.records.filter((r) => r.id !== record.id);
    this.setState({ records });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      records: allRecords,
    } = this.state;

    let filtered = allRecords;
    if (searchQuery)
      filtered = allRecords.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const records = paginate(sorted, currentPage, pageSize);

    return { data: records };
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.records;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no records in the database.</p>;
    const { data: records } = this.getPagedData();
    return (
      <React.Fragment>
        <p>Showing {count} records in the database.</p>
        <SearchRecord value={searchQuery} onChange={this.handleSearch} />
        <RecordTable
          records={records}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
        <Pagination
          itemsCount={count}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}
export default Records;
