import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    if (!user.username || !user.password) {
      alert("Username and password are required.");
      return;
    }

    try {
      console.log("Calling client side's client.signup(user)");
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/Profile");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("There was an error signing up. Please try again.");
    }
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <input
        value={user.username}
        onChange={(e) => {
          console.log("Setting username to " + e.target.value);
          setUser({ ...user, username: e.target.value });
        }}
        className="wd-username form-control mb-2"
        placeholder="username"
      />
      <input
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
        className="wd-password form-control mb-2"
        placeholder="password"
      />
      <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100">
        Sign up
      </button>
      <br />
      <Link to="/Kanbas/Account/Signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}

