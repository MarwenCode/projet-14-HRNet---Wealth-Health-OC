import React, { useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import "./table.scss";

const Table = ({ employeeList }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState("");

  const sortedEmployees = [...employeeList];

  if (sortConfig.key) {
    sortedEmployees.sort((a, b) => {
      const aValue = a[sortConfig.key].toString().toLowerCase();
      const bValue = b[sortConfig.key].toString().toLowerCase();
      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }

  const filteredEmployees = sortedEmployees.filter((emp) => {
    return (
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.startDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.dob.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.zip.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredEmployees.length / entriesPerPage);

  const getDisplayedEmployees = () => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return filteredEmployees.slice(startIndex, endIndex);
  };

  const displayedEmployees = getDisplayedEmployees();

  const nextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const renderSortArrow = (key) => {
    const isActive = sortConfig.key === key;

    return (
      <span className="sort-arrows">
        <FaSortUp
          className="icon-sort"
          style={{
            color:
              isActive && sortConfig.direction === "ascending"
                ? "black"
                : "rgba(0, 0, 0, 0.3)",
          }}
        />
        <FaSortDown
          className="icon-sort"
          style={{
            color:
              isActive && sortConfig.direction === "descending"
                ? "black"
                : "rgba(0, 0, 0, 0.3)",
          }}
        />
      </span>
    );
  };

  return (
    <div className="employeeTable">
      <h2>Current Employees</h2>
      <div className="table-options">
        <label htmlFor="entries-per-page">
          Show
          <select
            id="entries-per-page"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        <span> entries</span>
        </label>

        <div className="search">
          <span>Search: </span>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search employees..." 
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("firstName")}>
              First Name {renderSortArrow("firstName")}
            </th>
            <th onClick={() => handleSort("lastName")}>
              Last Name {renderSortArrow("lastName")}
            </th>
            <th onClick={() => handleSort("startDate")}>
              Start Date {renderSortArrow("startDate")}
            </th>
            <th onClick={() => handleSort("department")}>
              Department {renderSortArrow("department")}
            </th>
            <th onClick={() => handleSort("dob")}>
              Date of Birth {renderSortArrow("dob")}
            </th>
            <th onClick={() => handleSort("street")}>
              Street {renderSortArrow("street")}
            </th>
            <th onClick={() => handleSort("city")}>
              City {renderSortArrow("city")}
            </th>
            <th onClick={() => handleSort("state")}>
              State {renderSortArrow("state")}
            </th>
            <th onClick={() => handleSort("zip")}>
              Zip Code {renderSortArrow("zip")}
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedEmployees.length > 0 ? (
            displayedEmployees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.startDate}</td>
                <td>{emp.department}</td>
                <td>{emp.dob}</td>
                <td>{emp.street}</td>
                <td>{emp.city}</td>
                <td>{emp.state}</td>
                <td>{emp.zip}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="pagination-button">
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="pagination-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;