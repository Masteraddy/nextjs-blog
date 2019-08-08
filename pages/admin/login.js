import React, { useState } from "react";
import Router from "next/router";
import NoSsr from "react-no-ssr";
import cookie from "react-cookies";
import { url2 } from "../../lib/config";
import fetch from "isomorphic-unfetch";

const LoginPage = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [errors, seterrors] = useState("");
  if (typeof window !== "undefined") {
    const id = cookie.load("x-undermi-jv");
    const token = cookie.load("mk-token");
    if (token && id) {
      Router.push("/admin");
      return null;
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    var login = {
      username,
      password,
    };
    // this.props.addPost(mypost);
    setusername("");
    setpassword("");
    fetch(`${url2}/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(login),
    })
      .then(res => {
        if (res.status == 400) seterrors("You're not allowed here dude!!!");
        return res.json();
      })
      .then(data => {
        if (typeof data.token !== "undefined") {
          cookie.save("mk-token", data.token, { path: "/", maxAge: 3595 });
          cookie.save("x-undermi-jv", data.user.id, {
            path: "/",
            maxAge: 3595,
          });
          Router.push("/admin");
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <NoSsr onSSr={<div>Loading...</div>}>
      <div className="card">
        <h2>LoginPage</h2>
        <form onSubmit={handleSubmit}>
          <h5 style={{ color: "red" }}>{errors}</h5>
          <label>Username :</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => setusername(e.target.value)}
          />
          <label>Password :</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setpassword(e.target.value)}
          />
          <button
            className="btn greenbtn"
            style={{ width: "100%", marginTop: "1rem" }}
          >
            Login
          </button>
        </form>
      </div>
    </NoSsr>
  );
};

// LoginPage.getInitialProps = ({ res }) => {
//   const token = cookie.load("mk-token");
//   const id = cookie.load("x-undermi-jv");
//   if (token && id) {
//     Router.push("/adminin");
//   }
//   return {};
// };

export default LoginPage;
