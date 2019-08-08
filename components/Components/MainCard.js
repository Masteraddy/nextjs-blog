import React from "react";
// import renderHtml from "react-render-html";
import Link from "next/link";

const MainCard = props => {
  const { username, title, post, url, category, date } = props.post;
  const sdate = new Date(date).toDateString();
  const desc = post.substring(0, 180);
  return (
    <div className="maincard">
      <div className="main-img">
        <Link href={`/blog/${url}`}>
          <a>
            <img
              style={{ borderRadius: "0px", maxHeight: "22rem" }}
              src="/static/bitcoin-img.jpg"
              alt="Post Image"
            />
          </a>
        </Link>
      </div>
      <div className="container">
        <p style={{ color: "gray", fontSize: "15px", fontWeight: "bold" }}>
          <i>
            Posted by {username}, {sdate}
          </i>
        </p>
        <h2 style={{ textTransform: "capitalize", marginTop: "-4px" }}>
          <Link href={`/blog/${url}`}>
            <a style={{ textDecoration: "none" }}>{title}</a>
          </Link>
        </h2>
        {/* <Link href={`/blog/${url}`}>
          <div className="desc" style={{ color: "#444" }}>
            {renderHtml(desc)}
          </div>
        </Link> */}
      </div>
      <style jsx>
        {`
          @media only screen and (max-width: 640px) {
            .maincard {
              height: auto;
            }
            .desc {
              display: none;
            }
          }
          .desc {
            cursor: pointer;
          }
          div.container {
            padding: 8px;
          }
        `}
      </style>
    </div>
  );
};

export default MainCard;
