import React, { useContext } from "react";
import Header from "../../components/Components/Header";
import Link from "next/link";
import renderHtml from "react-render-html";
import ReactDisqusComment from "react-disqus-comments";
import { api } from "../../lib/config";
import AboutMeCard from "../../components/Components/AboutMeCard";
import Head from "../../components/Layout/Head";
import ApiContext from "../../components/ApiContext";

const PostPage = props => {
  const sdate = new Date(props.post.date).toDateString();
  const apis = useContext(ApiContext);
  const desc = props.post.post.substring(0, 180);
  const handleComment = object => {
    console.log(object);
  };
  return (
    <div
      style={{
        marginTop: "0",
        padding: "2rem 0.5rem 1rem 0.5rem",
      }}
    >
      <Head
        title={props.post.title}
        brandname={apis.brandname}
        url={props.post.url}
        description={desc}
      />
      <Header title={props.post.title} />
      <div className="row">
        <h4 style={{ color: "gray", textAlign: "center" }}>
          Posted by {props.post.username}, {sdate}
        </h4>
        <div
          style={{
            textAlign: "center",
            paddingBottom: "0.5rem",
          }}
        >
          <div className="sharethis-inline-share-buttons" />
          <div
            style={{
              textAlign: "center",
              borderBottom: "2px solid grey",
              marginLeft: "20%",
              marginTop: "5px",
              marginRight: "20%",
            }}
          />
        </div>
        {/* <div>
          <FacebookShareButton />
        </div> */}
        <div
          style={{
            paddingTop: "1rem",
            padding: "1rem 1rem 0rem 1rem",
          }}
        >
          {renderHtml(props.post.post)}
        </div>
        <div className="maincate">
          {props.post.category.map(data => (
            <Link key={data} href={`/archive/${data}`}>
              <a>
                <div className="category">{data}</div>
              </a>
            </Link>
          ))}
        </div>
        {/* {JSON.stringify(props)} */}
        <AboutMeCard author={props.post.username} />
        <div className="row">
          {props.npost ? (
            <Link href={`/blog/${props.npost.url}`}>
              <a
                className="right"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                <p>{props.npost.title}</p>
              </a>
            </Link>
          ) : (
            <div className="left" style={{ textDecoration: "none" }}>
              <h3>First Post</h3>
            </div>
          )}
          {props.ppost ? (
            <Link href={`/blog/${props.ppost.url}`}>
              <a className="right" style={{ textDecoration: "none" }}>
                <p>{props.ppost.title}</p>
              </a>
            </Link>
          ) : (
            <div className="left" style={{ textDecoration: "none" }}>
              <h3>Last Post</h3>
            </div>
          )}
        </div>
        <h2 style={{ textAlign: "center" }}>Comments</h2>
        <ReactDisqusComment
          shortname="quoracompile"
          url={`https://jaycruzworld.now.sh/blog/${props.post.url}`}
          identifier={props.post.url}
          title={props.post.title}
          onNewComment={handleComment}
        />
      </div>
      <style jsx>{`
        i.fab,
        i.fas {
          margin: 0.5rem;
        }
        .category {
          display: inline-block;
          color: white;
          padding: 10px 20px 10px 20px;
          margin: 5px;
          border-radius: 5%;
          background-color: #444;
        }
        .maincate {
          margin: 20px;
        }
        .right {
          padding: 0.1rem;
          border: 2px solid grey;
          background: grey;
          border-radius: 8px;
          margin: 0.5%;
          float: left;
          width: 49%;
          max-height: 8rem;
          height: 8rem;
          text-align: center;
          justify-content: center;
          overflow: hidden;
        }
        .left {
          background: lightgrey;
          justify-content: center;
          text-align: center;
          margin: 0.5%;
          padding: 0.1rem;
          border: 2px solid grey;
          border-radius: 8px;
          float: left;
          width: 49%;
          max-height: 8rem;
          height: 8rem;
          overflow: hidden;
        }

        .right:hover {
          background: grey;
          color: white;
        }

        textarea {
          width: 100%;
          height: 100px;
          border-color: grey;
          border-radius: 5px;
          padding: 10px;
          font-family: sans-serif;
        }

        input[type="text"] {
          width: 100%;
          height: 40px;
          border-color: gray;
          border-radius: 5px;
          border-size: 1px;
          padding: 10px;
          margin-bottom: 5px;
          font-family: sans-serif;
        }

        button {
          width: 100%;
          border-radius: 5px;
          background: gray;
          padding: 10px 20px 10px 20px;
          border: none;
          color: white;
        }
      `}</style>
    </div>
  );
};

PostPage.getInitialProps = async ({ query: { name } }) => {
  const posts = await api.getPost();
  const post = await api.showPost(posts, name);
  const index = await api.prevNextPost(posts, name);
  return { post, ppost: index.ppost, npost: index.npost };
};

export default PostPage;
