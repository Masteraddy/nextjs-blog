import React, { useContext } from "react";
import ApiContext from "../ApiContext";
import Link from "next/link";
import _ from "lodash";

const PopularPost = () => {
  const post = useContext(ApiContext);
  const recpost = post.recpost;
  return (
    <div className="card">
      <h2>Recent Posts</h2>
      {recpost.map(data => (
        <div key={data._id}>
          <div className="row">
            <Link href={`/blog/${data.url}`}>
              <a style={{ textDecoration: "none" }}>
                <div
                  className="img"
                  style={{
                    backgroundImage: "url(/static/bitcoin-img.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <p
                    style={{
                      textTransform: "capitalize",
                      textAlign: "center",
                      fontSize: "ForHeader",
                      fontWeight: "bold",
                      color: "#ffffffdb",
                    }}
                  >
                    {`${data.title.substring(0, 50)}...`}
                  </p>
                </div>
              </a>
            </Link>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default PopularPost;
