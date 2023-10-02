// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./LoginForm.css";

function LoginFormModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const isInvalid = credential.length < 4 || password.length < 6;


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .then(() => history.push('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ credential: "The provided credentials were invalid" })
        }
      });
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password"}))
    .then(closeModal)
    .then(() => history.push('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });

  };

  return (
    <div className="login-form-container">
      <h1 className="login-header">Log In</h1>
        {Object.values(errors).map((error, index) => (
          <p className="error" key={index}>
        {error}
        </p>
      ))}
      <form onSubmit={handleSubmit} className="form">
        <div className="credential-container">
          <label>
            <input
              type="text"
              value={credential}
              placeholder="Username or Email"
              onChange={(e) => setCredential(e.target.value)}
              required
              className="credential-input"
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="credential-input"
            />
          </label>
        </div>
          <div className="submit-login-button">
            <button type="submit" className="login-button" disabled={isInvalid}>Log In</button>
          </div>
          <div className="demo-button">
          <Link to="/" onClick={handleDemoLogin}>
            Demo User
          </Link>
          </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
