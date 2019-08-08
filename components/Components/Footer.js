import React, { useContext } from "react";
import ApiContext from "../ApiContext";
import Link from "next/link";

const Footer = () => {
  const apicont = useContext(ApiContext);
  const pages = apicont.page;
  const brandname = apicont.brandname;
  const shortabout = apicont.shortabout;
  const category = apicont.category;
  const uname = apicont.socials;
  return (
    <div className="foot">
      <div className="row footer">
        <div className="col-4">
          <h1>
            <i>{brandname}</i>
          </h1>
          <p>{shortabout}</p>
        </div>
        <div
          className="col-4 forfooter"
          style={{ borderBottom: "2px solid grey" }}
        >
          <h2 style={{ lineHeight: "5px" }}>Pages</h2>
          <ul>
            {pages.map(page => (
              <li key={page.name}>
                <Link href={page.url}>
                  <a style={{ textDecoration: "none" }}>{page.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-4 forfooter">
          <h2 style={{ lineHeight: "5px" }}>Categories</h2>
          <ul>
            <div>
              {category.map(cate => (
                <li className="maincate" key={cate}>
                  <Link href={`/archive/${cate}`}>
                    <a className="cate" style={{ textDecoration: "none" }}>
                      {cate}
                    </a>
                  </Link>
                </li>
              ))}
            </div>
          </ul>
        </div>
        <div className="col-12" style={{ lineHeight: "0px" }}>
          <h2>Follow Up</h2>
          <a href={`http://facebook.com/${uname.facebook}`}>
            <i style={{ fontSize: "2.5rem" }} className="fab fa-facebook" />
          </a>
          <a href={`http://pinterest.com/${uname.pinterest}`}>
            <i style={{ fontSize: "2.5rem" }} className="fab fa-pinterest" />
          </a>
          <a href={`http://twitter.com/${uname.twitter}`}>
            <i style={{ fontSize: "2.5rem" }} className="fab fa-twitter" />
          </a>
          <a href={`http://github.com/${uname.github}`}>
            <i style={{ fontSize: "2.5rem" }} className="fab fa-github" />
          </a>
        </div>
        <div className="col-12 mobilefooter">
          {pages.map(page => (
            <div key={page.name} className="line-link maincate">
              <Link href={page.url}>
                <a style={{ textDecoration: "none" }}>{`* ${page.name} *`}</a>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="copyright">
        <span>
          Copywrite &copy;{" "}
          <a href="/" style={{ textDecoration: "none" }}>
            JayCruzWorld
          </a>{" "}
          2019 | Designed by{" "}
          <a
            href="http://eliteaddy.github.io"
            style={{ textDecoration: "none" }}
          >
            EliteAddy Inc
          </a>
        </span>
      </div>
      <style jsx>
        {`
          i.fab,
          i.fas {
            margin: 0.5rem;
          }
          @media only screen and (max-width: 768px) {
            /* For mobile phones: */
            .forfooter {
              display: none;
            }
          }
          @media only screen and (min-width: 769px) {
            /* For mobile phones: */
            .mobilefooter {
              display: none;
            }
          }
          .mobilefooter {
            margintop: 5px;
          }
          .cate {
            display: inline-block;
            color: #fdfdfddb;
            padding: 10px 20px 10px 20px;
            margin: 1px;
            border-radius: 5%;
            background-color: #444;
          }
          .maincate {
            display: inline-block;
          }
        `}
      </style>
    </div>
  );
};

export default Footer;
