import React, { useState } from "react";
import cookie from "react-cookies";
import { api } from "../../lib/config";

const EditPassModal = props => {
  const openmodal = props.open;
  const [password, setpassword] = useState("");
  const [passwordd, setpasswordd] = useState("");
  const [msg, setMsg] = useState("");
  const handleSubmit = e => {
    const id = cookie.load("x-undermi-jv");
    e.preventDefault();
    if (password == passwordd && password != "") {
      var login = {
        password,
      };
      setpassword("");
      setpasswordd("");
      api.patchUser(login, id);
      // console.log(login);
      props.closer();
    } else {
      setMsg("Error In Verification");
    }
    // this.props.addPost(mypost);
  };

  const closerHandler = () => {
    setpassword("");
    setpasswordd("");
    setMsg("");
    props.closer();
  };

  return (
    <div className="modal" style={{ display: openmodal ? "block" : "none" }}>
      {/* Modal content */}
      <div className="modal-content">
        {/* <div className="modal-header">
          <span className="close" onClick={props.closer}>
            ×
          </span>
          <h2>Edit Your Password</h2>
        </div> */}
        <div className="modal-body">
          <span
            className="close"
            style={{ backgroundColor: "red", padding: "0.5rem" }}
            onClick={closerHandler}
          >
            ×
          </span>
          <h2>Edit Your Password</h2>
          <h5 style={{ color: "red" }}>{msg}</h5>
          <form onSubmit={handleSubmit}>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setpassword(e.target.value)}
            />
            <label>Confirm Password: </label>
            <input
              type="password"
              name="passwordd"
              value={passwordd}
              onChange={e => setpasswordd(e.target.value)}
            />
            <button
              className="btn greenbtn"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Login
            </button>
          </form>
        </div>
        {/* <div className="modal-footer">
          <h3>Modal Footer</h3>
        </div> */}
      </div>
    </div>
  );
};

export default EditPassModal;
