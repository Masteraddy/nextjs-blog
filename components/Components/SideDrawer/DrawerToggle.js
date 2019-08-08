import React from "react";

const DrawerToggle = props => {
  return (
    <button className="toggle-button" onClick={props.click}>
      <div className="toggle-button-line" />
      <div className="toggle-button-line" />
      <div className="toggle-button-line" />
      <style jsx>{`
        .toggle-button {
          height: 24px;
          width: 30px;
          background: transparent;
          border: none;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          cursor: pointer;
          box-sizing: border-box;
          padding: 0;
        }
        .toggle-button:focus {
          outline: none;
        }
        .toggle-button-line {
          width: 30px;
          height: 2px;
          background: grey;
        }
      `}</style>
    </button>
  );
};

export default DrawerToggle;
