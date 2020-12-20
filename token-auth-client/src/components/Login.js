import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

function Login({ onUpdateUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleGoogleLogin(response) {
    if (response.tokenId) {
      fetch("http://localhost:3000/google_login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${response.tokenId}`,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          const { user, token } = data;
          onUpdateUser(user);
          // also save the id to localStorage
          localStorage.token = token;
        });
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        const { user, token } = data;

        // save the user in state in App
        onUpdateUser(user);

        // also save the id to localStorage
        localStorage.token = token;
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input
          type="text"
          name="username"
          autoComplete="off"
          value={formData.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <input type="submit" value="Login" />
      </form>
      <hr />
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}

export default Login;
