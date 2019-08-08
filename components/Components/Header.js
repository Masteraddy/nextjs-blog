import React from "react";

const Header = props => {
  return (
    <div
      style={{
        backgroundColor: "white",
      }}
    >
      <div
        className="header"
        style={{
          backgroundImage: "url(/static/bitcoin-img.jpg)",
          backgroundSize: "cover",
          height: "auto",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            color: "#ffffffd8",
            fontSize: "2.25rem",
            textTransform: "capitalize",
          }}
        >
          {props.title}
        </h2>
      </div>
      <style jsx>{`
        @media screen and (min-width: 800px) {
          .header {
            max-height: 300px;
          }
        }
        .header {
          min-height: 280px;
        }
      `}</style>
    </div>
  );
};

export default Header;
