import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/UserContext";
import "./navBar.css"
import { useNavigate } from "react-router-dom";

function NavBar() {

  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Employee Reimbursement Portal
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">    

              { user.isAuthenticated && (
                <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Ticket Dashboard
                </Link>
              </li>
            )}
              { user.isAuthenticated && (
                <li className="nav-item">
                <Link className="nav-link" to="/createTicket">
                  Create a Ticket
                </Link>
              </li>
            )}   
              { user.isAuthenticated && (
                <li className="nav-item">
                <Link className="nav-link" to="/previous-tickets">
                  View Your Previous Tickets
                </Link>
              </li>
            )}             
              
            </ul>
            {user.isAuthenticated && (
            <button
              className="btn btn-outline-light ms-auto"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;