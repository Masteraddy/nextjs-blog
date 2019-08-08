import React, { useState, useContext } from "react";
import Router from "next/router";
import NoSsr from "react-no-ssr";
import Link from "next/link";
import { api } from "../../lib/config";
import cookie from "react-cookies";
import EditPassModal from "../../components/Components/EditPassModal";
import AddUserModal from "../../components/Components/AddUserModal";
import AddPostModal from "../../components/Components/AddPost";
import ApiContext from "../../components/ApiContext";

const AdminPage = props => {
  const [modalopen1, setmodalopen1] = useState(false);
  const [modalopen2, setmodalopen2] = useState(false);
  const [modalopen3, setmodalopen3] = useState(false);
  const apis = useContext(ApiContext);
  const deleteit = id => {
    var msg = confirm("Are you sure you wont to delete this??");
    if (msg) {
      api.delPost(id);
      window.location.reload();
    }
  };
  const modalHandler1 = () => {
    setmodalopen1(!modalopen1);
  };
  const modalHandler2 = () => {
    setmodalopen2(!modalopen2);
  };
  const handleLogout = () => {
    cookie.remove("mk-token", { path: "/" });
    cookie.remove("x-undermi-jv", { path: "/" });
    Router.push("/admin/login");
  };
  const closerHandler3 = () => {
    setmodalopen3(false);
  };
  if (typeof window !== "undefined") {
    const token = cookie.load("mk-token");
    const id = cookie.load("x-undermi-jv");
    if (!token && !id) {
      Router.push("/admin/login");
      return null;
    }
  }

  return (
    <NoSsr onSSr={<div>Loading...</div>}>
      <div className="card">
        {apis.user ? <h2>Welcome {apis.user.username}</h2> : null}
        <Link href={`/admin/addpost`}>
          <a
            className="btn bluebtn"
            style={{
              marginBottom: "0.5rem",
              width: "100%",
            }}
            // onClick={modalHandler3}
          >
            Add New Post
          </a>
        </Link>
        <a
          className="btn"
          style={{
            marginBottom: "0.5rem",
            width: "100%",
          }}
          onClick={modalHandler1}
        >
          Edit Password
        </a>
        <a
          className="btn greenbtn"
          style={{
            marginBottom: "0.5rem",
            width: "100%",
          }}
          onClick={modalHandler2}
        >
          Add New User
        </a>
        <a
          className="btn redbtn"
          style={{
            marginBottom: "0.5rem",
            width: "100%",
          }}
          onClick={handleLogout}
        >
          Log Out
        </a>
        <EditPassModal open={modalopen1} closer={modalHandler1} />
        <AddUserModal open={modalopen2} closer={modalHandler2} />
        <AddPostModal open={modalopen3} closer={closerHandler3} />
        <h3>All Posts</h3>
        <div
          style={{
            marginBottom: "2rem",
            width: "100%",
          }}
        />
        {props.posts.map(data => (
          <div key={data._id}>
            <div className="row">
              <div
                className="img"
                style={{
                  backgroundImage: "url(./static/bitcoin-img.jpg)",
                  backgroundRepeat: "no-repeat",
                  height: "auto",
                  backgroundSize: "cover",
                }}
              >
                <h3
                  style={{
                    padding: "0.7rem",
                    textTransform: "capitalize",
                    textAlign: "center",
                    color: "#ffffffdb",
                  }}
                >
                  {`${data.title}`}
                </h3>
              </div>
              <button
                className="btn redbtn"
                onClick={deleteit.bind(this, data._id)}
              >
                Delete
              </button>
              <Link href={`/admin/editpost?id=${data._id}`}>
                <a className="btn greenbtn">Edit</a>
              </Link>
            </div>
            <br />
          </div>
        ))}
      </div>
    </NoSsr>
  );
};

AdminPage.getInitialProps = async () => {
  const posts = await api.getPost();
  // console.log(posts);
  return { posts };
};

export default AdminPage;
