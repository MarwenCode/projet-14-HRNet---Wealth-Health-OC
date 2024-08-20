import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import { Navigate, useNavigate,Link } from 'react-router-dom';


import './navbar.scss';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // const [isModalOpen, setIsModalOpen] = useState(false);


  const handleLogout = () => {
    dispatch(logout());
  };

  // const handleAddEmployeeClick = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <nav className="navbar">
        <Link to="/">
      <div className="logo">
        
       
        <img
          className="main-nav-logo-image"
          src="/assets/icon-health.png"
          alt="RhNet - Wealth Health"
          />
        <p>HRNet - Wealth Health</p>
      </div>
          </Link>
      <ul className="nav-list">
        {isAuthenticated ? (
          <>
        <Link to="/addEmployee">
        <li className="nav-item" >
              <button className="add-employee-button">
                <i className="fas fa-user-plus"></i>
              </button>
              Add Employee
            </li>
        </Link>
            
            <li className="nav-item" onClick={handleLogout}>Logout</li>
            <li className="nav-item">{user.username}</li>
          </>
        ) : (
          <li className="nav-item">Sign In</li>
        )}
      </ul>
      {/* <Modal isOpen={isModalOpen} onClose={handleCloseModal} /> */}
    </nav>
  );
};

export default Navbar;




