import React, { useState } from "react";
import { api } from "../../lib/config";

const AddUserModal = props => {
  const openmodal = props.open;
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    var login = {
      password,
      username,
    };
    // this.props.addPost(mypost);
    setusername("");
    setpassword("");
    api.putUser(login);
    console.log(login);
    props.closer;
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
            onClick={props.closer}
          >
            ×
          </span>
          <h2>Register Me</h2>
          <form onSubmit={handleSubmit}>
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
              Register
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

export default AddUserModal;
