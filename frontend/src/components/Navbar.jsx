import React from "react";
import { FaBookOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container gap-3 ">
          <Link className="navbar-brand" to="/">
            <FaBookOpen />
            &nbsp;
            <b>TODO</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-items mx-2 align-items-center">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-items mx-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About Us
                </Link>
              </li>
              <li className="nav-items mx-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/todo"
                >
                  Todo
                </Link>
              </li>
              {!isLoggedIn && (
                <>
                  <li className="nav-items mx-2">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/signup"
                    >
                      SignUp
                    </Link>
                  </li>
                  <li className="nav-items mx-2">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/signin"
                    >
                      SignIn
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <li className="nav-items mx-2 " onClick={logout}>
                  <Link
                    className="nav-link active btn-nav"
                    aria-current="page"
                    to="/"
                  >
                    LogOut
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
