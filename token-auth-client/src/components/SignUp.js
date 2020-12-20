import React, { useState } from "react";

function SignUp({ onUpdateUser }) {
  const [formData, setFormData] = useState({
    username: "",
    image: "",
    bio: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        const { user, token } = data;

        // then set that user in state in our App component
        onUpdateUser(user);
        // also save the id to localStorage
        localStorage.token = token;
      });
  }

  const { username, image, bio, password } = formData;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>

      <label>Username</label>
      <input
        type="text"
        name="username"
        autoComplete="off"
        value={username}
        onChange={handleChange}
      />

      <label>Profile Image</label>
      <input
        type="text"
        name="image"
        autoComplete="off"
        value={image}
        onChange={handleChange}
      />
      <img
        src={
          image.length
            ? image
            : "https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png"
        }
        alt={username}
      />

      <label>Bio</label>
      <textarea name="bio" value={bio} onChange={handleChange} />

      <label>Password</label>
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={handleChange}
      />

      <input type="submit" value="Signup" />
    </form>
  );
}

export default SignUp;
