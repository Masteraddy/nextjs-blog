import React, { useState, useContext } from "react";
import Toolbar from "../Components/Toolbar";
import SideDrawer from "../Components/SideDrawer/SideDrawer";
import BackDrop from "../Components/Backdrop";
import PopularPost from "../Components/PopularPost";
import FollowMe from "../Components/FollowMe";
import Footer from "../Components/Footer";
import DailyQuote from "../Components/DailyQuote";
import Head from "./Head";
import ApiContext from "../ApiContext";

const Layout = props => {
  const [drawerOpen, setDrawer] = useState(false);
  const api = useContext(ApiContext);
  const color = api.tColor;
  const drawerHandler = () => {
    setDrawer(!drawerOpen);
  };
  const backdropHandler = () => {
    setDrawer(false);
  };
  return (
    <div style={{ height: "100%" }}>
      <Head brandname={props.bname} barcolor={color} title={props.title} />
      <Toolbar drawerHandler={drawerHandler} />
      <SideDrawer
        show={drawerOpen}
        nightmode={props.nightmode}
        closeClicked={drawerHandler}
      />
      {drawerOpen ? <BackDrop click={backdropHandler} /> : null}
      {/* <Header /> */}
      <div className="upspacer" />
      <div>
        <div className="row">
          <div className="leftcolumn">
            <main>{props.children}</main>
          </div>
          <div className="rightcolumn">
            <DailyQuote />
            <PopularPost />
            <FollowMe />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
