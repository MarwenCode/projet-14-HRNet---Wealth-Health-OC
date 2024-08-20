import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { employees as initialEmployees } from './utils/data'; // Données par défaut
import { useSelector } from 'react-redux';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import SignIn from './components/signin/SignIn';
import AddEmployee from "./pages/addEmployee/AddEmployee";

import './App.css';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    // Charger les employés depuis localStorage
    const storedEmployees = JSON.parse(localStorage.getItem('employees'));

    if (storedEmployees && storedEmployees.length > 0) {
      setEmployeeList(storedEmployees);
    } else {
      // Si `localStorage` est vide, stocker les employés initiaux
      localStorage.setItem('employees', JSON.stringify(initialEmployees));
      setEmployeeList(initialEmployees);
    }

    // Debug : afficher les employés chargés dans la console
    console.log('Loaded employees:', storedEmployees || initialEmployees);
  }, []);

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
         
          <Route
            path="/addEmployee"
            element={isAuthenticated ? <AddEmployee /> : <SignIn />}
          />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/"
            element={isAuthenticated ? <Home employeeList={employeeList} /> : <SignIn />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;







