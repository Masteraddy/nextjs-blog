import React, { useContext } from "react";
import cookie from "react-cookies";
import ApiContext from "../../ApiContext";
import Link from "next/link";

const SideDrawer = props => {
  const api = useContext(ApiContext);
  const pages = api.page;
  const token = api.user;
  // console.log(token);
  var isAddy = false;
  if (typeof token !== null) {
    isAddy = true;
  }
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <nav className={drawerClasses}>
      <a href={void 0} className="closebtn" onClick={props.closeClicked}>
        &times;
      </a>
      <a
        href={void 0}
        style={{
          padding: "0px",
          margin: "0px",
          borderRadius: "0",
          maxHeight: "150px",
        }}
      >
        <img
          src="/static/images/wheel-1000.jpg"
          alt="For Site"
          style={{
            padding: "0px",
            margin: "0px",
            borderRadius: "0",
            maxHeight: "150px",
          }}
        />
      </a>
      {pages.map(data => (
        <Link key={data.name} href={data.url}>
          <a onClick={props.closeClicked}>{data.name}</a>
        </Link>
      ))}
      <Link href="/admin/login">
        <a onClick={props.closeClicked}>Admin</a>
      </Link>
      <style jsx>{`
        .side-drawer {
          height: 100%;
          background: #fff;
          box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
          position: fixed;
          top: 0;
          left: 0;
          width: 70%;
          max-width: 400px;
          z-index: 200;
          overflow-x: hidden;
          transform: translateX(-100%);
          transition: transform 0.3s ease-out;
        }
        .side-drawer.open {
          transform: translateX(0);
        }
        .side-drawer ul {
          height: 100%;
          list-style: none;
        }
        .side-drawer li {
          margin: 0.5rem 0;
        }
        .side-drawer a:hover,
        .side-drawer a:active {
          background-color: #504f51;
          color: #fdfdfd;
        }
        .side-drawer a {
          padding: 12px 8px 12px 8px;
          text-decoration: none;
          text-align: center;
          font-size: 25px;
          display: block;
          transition: 0.3s;
          color: #555;
          text-decoration: none;
          font-size: 1.5rem;
        }
        .closebtn {
          position: absolute;
          padding: 6px 8px 6px 8px !important;
          cursor: pointer;
          border-radius: 8px;
          top: 5px;
          background-color: #504f51;
          color: #fff !important;
          right: 5px;
          font-size: 36px !important;
          margin-left: 50px;
        }
        @media (min-width: 769px) {
          .side-drawer {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default SideDrawer;
