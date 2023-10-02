import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./SignupForm.css";

function SignupFormModal() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  if (user) history.push('/');

  const isInvalid =
    email === "" ||
    username.length < 4 ||
    firstName === "" ||
    lastName === "" ||
    password.length < 6 ||
    confirmPassword !== password;



  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then((user) => {
          if (!user.errors) {
            dispatch(sessionActions.login({ credential: email, password}));
            closeModal();
          }
        })
        .catch(async (res) => {
          const data = await res.json();
          console.log(data, '-----be')
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
  });
  };

  return (
    <div className="sign-up-container">
      <div >
        <h1 className="signup-header">Sign Up</h1>
            {Object.values(errors).map((error, index) => (
              <p className="error" key={index}>
            {error}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="info-container">
        <label>
          <input
            className="info-input"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        </div>
        <div className="info-container">
          <label>
            <input
              className="info-input"
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="info-container">
          <label>
            <input
              className="info-input"
              type="text"
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="info-container">
          <label>
            <input
              className="info-input"
              type="text"
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="info-container">
          <label>
            <input
              className="info-input"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="info-container">
          <label>
            <input
              className="info-input"
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="signup-button-container">
          <button className="sign-up-button" type="submit" disabled={isInvalid}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
