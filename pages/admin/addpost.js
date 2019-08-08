import React, { useContext } from "react";
import NoSsr from "react-no-ssr";
import Router from "next/router";
import cookie from "react-cookies";
import AddPostCont from "../../components/Components/AddPostCont";
import ApiContext from "../../components/ApiContext";
// import TextEditor from "../../components/Components/TestEditor";

const AddPost = () => {
  if (typeof window !== "undefined") {
    const token = cookie.load("mk-token");
    const id = cookie.load("x-undermi-jv");
    if (!token && !id) {
      Router.push("/admin/login");
      return null;
    }
  }
  const api = useContext(ApiContext);
  return (
    <NoSsr onSSr={<div>Loading...</div>}>
      <div className="card">
        {/* <TextEditor /> */}
        <AddPostCont options={api.category} />
      </div>
    </NoSsr>
  );
};

export default AddPost;
