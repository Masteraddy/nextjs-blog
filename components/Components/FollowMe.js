import React, { useContext } from "react";
import ApiContext from "../ApiContext";

const FollowMe = () => {
  const api = useContext(ApiContext);
  const uname = api.socials;
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h2>Follow Me</h2>
      <a href={`http://facebook.com/${uname.facebook}`}>
        <i
          style={{ fontSize: "3rem", color: "#4551f8" }}
          className="fab fa-facebook-square"
        />
      </a>
      <a href={`http://pinterest.com/${uname.pinterest}`}>
        <i
          style={{ fontSize: "3rem", color: "red" }}
          className="fab fa-pinterest-square"
        />
      </a>
      <a href={`http://twitter.com/${uname.twitter}`}>
        <i
          style={{ fontSize: "3rem", color: "skyblue" }}
          className="fab fa-twitter-square"
        />
      </a>
      <a href={`http://github.com/${uname.github}`}>
        <i
          style={{ fontSize: "3rem", color: "#444" }}
          className="fab fa-github-square"
        />
      </a>
      <style jsx>{`
        i.fab,
        i.fas {
          margin: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default FollowMe;
