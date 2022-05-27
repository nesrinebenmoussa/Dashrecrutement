import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserShield,
  FaUsers,
  FaBriefcase,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";

function SideBar() {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || !user) {
      navigate("/login");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const logout = () => {
    console.log("logged out");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <div className='sidebar-brand'>
        <div className='sidebar-brand-logo'>
          <span>
            <img src='src/assets/logo.png' alt='logo' />
          </span>
        </div>
        <div className='sidebar-brand-name'>
          <h5>PFE</h5>
          <small>Offre d'emploi</small>
        </div>
      </div>
      <div className='sidebar-title'>
        <small>Menu</small>
      </div>
      <div className='sidebar-menu'>
        <ul>
          <li>
            <Link to='/'>
              <span
                data-bs-toggle='tooltip'
                data-bs-placement='right'
                title='Dashboard'>
                <FaHome />
              </span>
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to='recruters'>
              <span
                data-bs-toggle='tooltip'
                data-bs-placement='right'
                title='Recruters'>
                <FaUserShield />
              </span>
              <span>Recruters</span>
            </Link>
          </li>

          <li>
            <Link to='condidats'>
              <span
                data-bs-toggle='tooltip'
                data-bs-placement='right'
                title='Condidat'>
                <FaUsers />
              </span>
              <span> Condidats</span>
            </Link>
          </li>

          <li>
            <Link to='annonces'>
              <span
                data-bs-toggle='tooltip'
                data-bs-placement='right'
                title='Annonces'>
                <FaBriefcase />
              </span>
              <span> Annonces </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className='sidebar-footer'>
        <button
          className='logout-btn'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Logout'
          onClick={logout}>
          <FaSignOutAlt />
          <div className='ms-1'>Déconnexion</div>
        </button>
      </div>
    </>
  );
}

export default SideBar;
