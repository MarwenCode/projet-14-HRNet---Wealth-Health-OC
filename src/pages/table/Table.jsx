import React, { useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import "./table.scss";

const Table = ({ employeeList }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedEmployees = [...employeeList];

 

        // Compare les deux valeurs en fonction de la direction du tri (ascendant ou descendant)
//       Si aValue est inférieur à bValue, on veut les trier en fonction de la direction :
// Ascendant : Renvoie -1 pour indiquer que a doit être avant b.
// Descendant : Renvoie 1 pour indiquer que a doit être après b.

  if (sortConfig.key) {
    sortedEmployees.sort((a, b) => {
      // Obtenez les valeurs à comparer pour la clé de tri
      const aValue = a[sortConfig.key].toString().toLowerCase();
      const bValue = b[sortConfig.key].toString().toLowerCase();
  
      // Si aValue est inférieur à bValue
      if (aValue < bValue) {
        // En mode ascendant, a doit venir avant b (-1)
        // En mode descendant, a doit venir après b (1)
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      // Si aValue est supérieur à bValue
      if (aValue > bValue) {
        // En mode ascendant, a doit venir après b (1)
        // En mode descendant, a doit venir avant b (-1)
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      // Les valeurs sont égales, donc aucun changement
      return 0;
    });
  }
  


  // if (sortConfig.key) {
  //   sortedEmployees.sort((a, b) => {
  //     const aValue = a[sortConfig.key].toString().toLowerCase();
  //     const bValue = b[sortConfig.key].toString().toLowerCase();
  //     const comparison = aValue.localeCompare(bValue);
  //     return sortConfig.direction === "ascending" ? comparison : -comparison;
  //   });
  // }
  
  

  const totalPages = Math.ceil(sortedEmployees.length / entriesPerPage);

  const getDisplayedEmployees = () => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return sortedEmployees.slice(startIndex, endIndex);
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
            opacity: isActive && sortConfig.direction === "descending" ? 1 : 1,
          }}
        />
        <FaSortDown
          className="icon-sort"
          style={{
            color:
              isActive && sortConfig.direction === "descending"
                ? "black"
                : "rgba(0, 0, 0, 0.3)",
            opacity: isActive && sortConfig.direction === "ascending" ? 1 : 1,
          }}
        />
      </span>
    );
  };

  return (
    <div className="employeeTable">
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
          entries
        </label>
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
