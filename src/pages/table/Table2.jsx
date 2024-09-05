
import React, { useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import styled from "styled-components";

// Styled Components
const TableWrapper = styled.div`
  padding: 1rem;
  margin: 0 auto;
  max-width: 1200px;
  overflow-x: auto;
  font-family: Arial, sans-serif;
`;

const TableOptions = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  gap: 0.5rem;
`;

const Search = styled.div`
  margin-left: 66%;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  position: relative;
  background-color: #f4f4f4;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #344e41;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #516b5e;
  }

  &:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
  }
`;

const PaginationInfo = styled.span`
  font-size: 1rem;
`;

const SortArrows = styled.span`
  position: relative; 
  display: inline-block;  
  width: 10px;  
  height: 22px; 
  vertical-align: middle;  
`;

const IconSort = styled.span`
  position: absolute;  
  left: 0;  
  width: 100%;  
  text-align: center;  
  color: rgba(0, 0, 0, 0.3);
  transition: color 0.3s, opacity 0.3s;

  &:first-child {
    top: 0;  
    margin-bottom: 2px;
  }

  &:last-child {
    bottom: 0;  
     margin-top: 2px;
  }
`;

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
      <SortArrows>
        <IconSort
          className="icon-sort"
          style={{
            color:
              isActive && sortConfig.direction === "ascending"
                ? "black"
                : "rgba(0, 0, 0, 0.3)",
          }}>
          <FaSortUp />
        </IconSort>
        <IconSort
          className="icon-sort"
          style={{
            color:
              isActive && sortConfig.direction === "descending"
                ? "black"
                : "rgba(0, 0, 0, 0.3)",
          }}>
          <FaSortDown />
        </IconSort>
      </SortArrows>
    );
  };

  return (
    <TableWrapper>
      <h2>Current Employees</h2>
      <TableOptions>
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

        <Search>
          <span>Search: </span>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search employees..." 
          />
        </Search>
      </TableOptions>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader onClick={() => handleSort("firstName")}>
              First Name {renderSortArrow("firstName")}
            </TableHeader>
            <TableHeader onClick={() => handleSort("lastName")}>
              Last Name {renderSortArrow("lastName")}
            </TableHeader>
            <TableHeader onClick={() => handleSort("startDate")}>
              Start Date {renderSortArrow("startDate")}
            </TableHeader>
            <TableHeader onClick={() => handleSort("department")}>
              Department {renderSortArrow("department")}
            </TableHeader>
            <TableHeader onClick={() => handleSort("dob")}>
              Date of Birth {renderSortArrow("dob")}
            </TableHeader>
            <TableHeader onClick={() => handleSort("street")}>
              Street {renderSortArrow("street")}
            </TableHeader>
            <TableHeader onClick={() => handleSort("city")}>
              City {renderSortArrow("city")}
            </TableHeader>
            <TableHeader onClick={() => handleSort("state")}>
              State {renderSortArrow("state")}
            </TableHeader>
            <TableHeader onClick={() => handleSort("zip")}>
              Zip Code {renderSortArrow("zip")}
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {displayedEmployees.length > 0 ? (
            displayedEmployees.map((emp, index) => (
              <tr key={index}>
                <TableCell>{emp.firstName}</TableCell>
                <TableCell>{emp.lastName}</TableCell>
                <TableCell>{emp.startDate}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.dob}</TableCell>
                <TableCell>{emp.street}</TableCell>
                <TableCell>{emp.city}</TableCell>
                <TableCell>{emp.state}</TableCell>
                <TableCell>{emp.zip}</TableCell>
              </tr>
            ))
          ) : (
            <tr>
              <TableCell colSpan="9">No data available</TableCell>
            </tr>
          )}
        </tbody>
      </StyledTable>
      <Pagination>
        <PaginationButton
          onClick={prevPage}
          disabled={currentPage === 1}>
          Previous
        </PaginationButton>
        <PaginationInfo>
          Page {currentPage} of {totalPages}
        </PaginationInfo>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === totalPages}>
          Next
        </PaginationButton>
      </Pagination>
    </TableWrapper>
  );
};

export default Table;