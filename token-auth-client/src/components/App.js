import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Profile from "./Profile";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:3000/autologin", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((r) => {
        if (!r.ok) throw Error("Not logged in!");
        return r.json();
      })
      .then((user) => setCurrentUser(user))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (currentUser) {
      history.push("/home");
    } else {
      history.push("/");
    }
  }, [currentUser, history]);

  function handleLogout() {
    // remove the userId from localstorage
    localStorage.removeItem("token");
    setCurrentUser(null);
  }

  function onUpdateUser(user) {
    setCurrentUser(user);
  }

  return (
    <>
      <NavBar currentUser={currentUser} onLogout={handleLogout} />
      <main>
        <Switch>
          <Route path="/signup">
            <SignUp onUpdateUser={onUpdateUser} />
          </Route>
          <Route path="/login">
            <Login onUpdateUser={onUpdateUser} />
          </Route>
          <Route path="/profile">
            {currentUser ? (
              <Profile currentUser={currentUser} onUpdateUser={onUpdateUser} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/home">
            {currentUser ? (
              <h1>Welcome, {currentUser.username}</h1>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/">
            <h1>Please Login or Sign Up</h1>
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
