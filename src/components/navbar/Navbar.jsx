import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img
          className="main-nav-logo-image"
          src="/assets/icon-health.png"
          alt="RhNet - Wealth Health"
        />
        <p>HRNet - Wealth Health</p>
      </Link>
      <ul className="nav-list">
        {isAuthenticated ? (
          <>
            <li className="nav-item">
              <Link to="/addEmployee" className="add-employee-button">
                <i className="fas fa-user-plus"></i>
                Add Employee
              </Link>
            </li>
            <li className="nav-item" onClick={handleLogout}>
              Logout
            </li>
            <li className="nav-item">{user.username}</li>
          </>
        ) : (
          <li className="nav-item">
            <Link to="/login"  className="signIn"  >Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
