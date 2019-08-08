import React, { useContext, useState } from "react";
import Link from "next/link";
import ApiContext from "../ApiContext";

import DrawerToggleButton from "./SideDrawer/DrawerToggle";

const Toobar = props => {
  const apicont = useContext(ApiContext);
  const nightmode = apicont.nightmode;
  var bgColor = apicont.tColor;
  const brandname = apicont.brandname;
  const pages = apicont.page;
  return (
    <header className="toolbar">
      <nav className="toolbar__nav">
        <div className="toolbar-button-div">
          <DrawerToggleButton click={props.drawerHandler} />
        </div>
        <div className="toolbar__logo">
          <Link href="/">
            <a style={{ color: "#444" }}>
              <h3>
                <i>{brandname}</i>
              </h3>
            </a>
          </Link>
        </div>
        <div className="spacer" />
        <div className="toolbar_nav_items">
          <ul>
            {pages.map(page => (
              <li key={page.name}>
                <Link href={page.url}>
                  <a>{page.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <label className="switch">
          <input type="checkbox" onChange={apicont.toggleNm} />
          <div className="slider round" />
        </label>
      </nav>
      <style jsx global>{`
        .toolbar {
          width: 100%;
          z-index: 200;
          position: fixed;
          background: ${bgColor};
          height: 65px;
          margintop: 0;
          marginleft: 0;
          box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
          display: block;
        }
        .toolbar__nav {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 0.8rem;
        }
        .toolbar__logo {
          margin-left: 1rem;
        }
        .toolbar__logo a {
          color: white;
          font-size: 2rem;
          text-decoration: none;
        }
        .toolbar_nav_items a {
          color: #504f51f0;
          display: block;
          padding: 14px 16px;
          text-decoration: none;
        }
        .toolbar_nav_items a:hover,
        .toolbar_nav_items a:active {
          border-radius: 5px;
          background-color: #504f51;
          color: #fdfdfd;
        }
        .toolbar_nav_items ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
        }
        .toolbar_nav_items li {
          padding: 0 0.1rem;
        }
        .spacer {
          flex: 1;
        }
        @media (max-width: 768px) {
          .toolbar_nav_items {
            display: none;
          }
        }
        @media (min-width: 769px) {
          .toolbar-button-div {
            display: none;
          }
          .toolbar__logo {
            margin-left: 0;
          }
        }
        /* The switch - the box around the slider */
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        /* Hide default HTML checkbox */
        .switch input {
          display: none;
        }

        /* The slider */
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        input:checked + .slider {
          background-color: #2196f3;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(26px);
          -ms-transform: translateX(26px);
          transform: translateX(26px);
        }

        /* Rounded sliders */
        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </header>
  );
};

export default Toobar;
