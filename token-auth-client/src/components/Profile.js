import React, { useState } from "react";

function Profile({ onUpdateUser, currentUser }) {
  const [formData, setFormData] = useState({
    image: currentUser.image,
    bio: currentUser.bio,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((updatedUser) => {
        // then update that user in state in our App component
        onUpdateUser(updatedUser);
      });
  }

  const {
    image = "https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png",
    bio,
  } = formData;
  const { username } = currentUser;

  return (
    <form onSubmit={handleSubmit}>
      <h1>{username}'s Profile</h1>

      <label>Profile Image</label>
      <input
        type="text"
        name="image"
        autoComplete="off"
        value={image}
        onChange={handleChange}
      />
      <img src={image} alt={username} />

      <label>Bio</label>
      <textarea name="bio" value={bio} onChange={handleChange} />

      <input type="submit" value="Update" />
    </form>
  );
}

export default Profile;
