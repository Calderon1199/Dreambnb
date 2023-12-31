import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(sessionActions.logout());
    history.push("/");

    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-menu">
      <button onClick={openMenu} className="profile-button">
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="profile-modal">
            <div className="greetings">
              <p className="greetings-text">Hello {user.username},</p>
              <p className="greetings-text">{user.email}</p>
            </div>
            <NavLink to="/spots/user" onClick={closeMenu} className="manage-spots">
              Manage Spots
            </NavLink>
            <li className="button-container">
              <button onClick={logout} className="logout-button">Log Out</button>
            </li>
          </div>
        ) : (
          <div className="account-buttons-container">
            <div className="account-buttons">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className="account-buttons">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
