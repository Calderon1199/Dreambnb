import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);


    return (
        <>
            <ul className="nav-bar">
                <li className="nav-links">
                <NavLink exact to="/">
                    <img src="https://www.vectorlogo.zone/logos/airbnb/airbnb-ar21.svg" alt="logo"/>
                </NavLink>
                </li>
                {isLoaded && sessionUser && (
                    <li>
                        <NavLink to="/spots/new" className="create-spot-button">
                        Create a new spot
                        </NavLink>
                    </li>
                )}
                {isLoaded && (
                <li>
                    <ProfileButton user={sessionUser} />
                </li>
                )}
            </ul>
        </>
    );
  }

export default Navigation;
