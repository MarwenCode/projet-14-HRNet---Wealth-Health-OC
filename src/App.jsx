import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { employees as initialEmployees } from './utils/data'; 
import { useSelector } from 'react-redux';
import Navbar from './components/navbar/Navbar';
import { Table } from 'employee-table-react';  
import SignIn from './components/signin/SignIn';
import AddEmployee from './pages/addEmployee/AddEmployee';

import './App.css';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    if (storedEmployees.length > 0) {
      setEmployeeList(storedEmployees);
    } else {
      localStorage.setItem('employees', JSON.stringify(initialEmployees));
      setEmployeeList(initialEmployees);
    }
  }, []);

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route
            path="/addEmployee"
            element={isAuthenticated ? (
              <AddEmployee 
                employeeList={employeeList} 
                setEmployeeList={setEmployeeList} 
              />
            ) : (
              <SignIn />
            )}
          />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/"
            element={isAuthenticated ? (
              <Table employeeList={employeeList} />
            ) : (
              <SignIn />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;







