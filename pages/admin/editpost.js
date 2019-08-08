import React, { useContext } from "react";
import NoSsr from "react-no-ssr";
import Router from "next/router";
import cookie from "react-cookies";
import EditPostCont from "../../components/Components/EditPostCont";
import { api } from "../../lib/config";
import ApiContext from "../../components/ApiContext";

const EditPost = props => {
  if (typeof window !== "undefined") {
    const token = cookie.load("mk-token");
    const id = cookie.load("x-undermi-jv");
    if (!token && !id) {
      Router.push("/admin/login");
      return null;
    }
  }
  const Api = useContext(ApiContext);
  return (
    <NoSsr onSSr={<div>Loading...</div>}>
      <div className="card">
        <EditPostCont options={Api.category} post={props.post} />
      </div>
    </NoSsr>
  );
};
EditPost.getInitialProps = async ({ query: { id } }) => {
  const posts = await api.getPost();
  const post = await api.showePost(posts, id);
  return { post };
};

export default EditPost;
