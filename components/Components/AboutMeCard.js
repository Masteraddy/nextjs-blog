import React, { useContext } from "react";
import ApiContext from "../ApiContext";

const AboutMeCard = props => {
  const { aboutAuthor } = useContext(ApiContext);
  return (
    <div
      className=""
      style={{
        textAlign: "center",
        border: "1px solid lightgray",
        padding: "5px",
        marginTop: "2rem",
      }}
    >
      <div className="row flexspacer">
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h2>Authored by {props.author}</h2>
          <p>{aboutAuthor}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutMeCard;
