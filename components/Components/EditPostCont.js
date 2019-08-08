import React, { Component } from "react";
import { api } from "../../lib/config";
import Router from "next/router";
import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import Turndown from "turndown";
const turndown = new Turndown();
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

class EditPostCont extends Component {
  state = {
    username: this.props.post.username,
    title: this.props.post.title,
    setquil: false,
    post: this.props.post.post,
    url: this.props.post.url,
    category: this.props.post.category,
    options: this.props.options,
  };
  post = turndown.turndown(this.props.post.post);
  handleChange = e => {
    if (e.target.name == "title") {
      this.handleUrl(e);
      this.setState({
        [e.target.name]: e.target.value,
      });
      // console.log(url);
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  // console.log(date);
  handleSubmit = e => {
    const { url, username, title, post, category } = this.state;
    e.preventDefault();
    var mypost = {
      username,
      title,
      post,
      category,
      url,
    };
    // this.props.addPost(mypost);
    this.setState({
      title: "",
      post: "",
      category: [],
      url: "",
    });
    api.patchPost(mypost, this.props.post._id);
    console.log(mypost);
    Router.push("/admin");
    // window.location.href = "/admin";
  };

  handleUrl = e => {
    var title = e.target.value;
    const date = Date.now().toString(32);
    title = title.replace(/[^a-zA-Z0-9-]+/g, "-");
    var tourl = date + "-" + title.toLowerCase();
    var url = tourl.substring(0, 58);
    this.setState({
      url,
    });
  };
  handleCate = e => {
    var cate = [e.target.value, ...this.state.category];
    var test = [...new Set(cate)];
    this.setState({ category: test });
  };

  mdParser = new MarkdownIt(/* Markdown-it options */);

  handleEditorChange = ({ html, md }) => {
    this.setState({ post: html });
  };

  render() {
    const {
      options,
      url,
      username,
      setquil,
      title,
      post,
      category,
    } = this.state;

    // console.log(openmodal);
    return (
      <div>
        <h2>Edit Post</h2>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Post Title: </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleChange}
            />
            <label>Post Url: </label>
            <input
              type="text"
              name="url"
              value={url}
              onChange={this.handleChange}
            />
            <label>Post Content: </label>
            <div style={{ height: "500px", paddingBottom: "1rem" }}>
              <MdEditor
                value={this.post}
                renderHTML={text => this.mdParser.render(text)}
                onChange={this.handleEditorChange}
              />
            </div>
            <div>
              {category.map(data => (
                <span key={data}>{data}</span>
              ))}
              {` `}
            </div>
            <select
              multiple
              name="category"
              value={category}
              onChange={this.handleCate}
            >
              {options.map(val => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
            <button
              className="btn greenbtn"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Submit
            </button>
          </form>
          <button
            className="btn redbtn"
            style={{ width: "100%", marginTop: "1rem" }}
            onClick={e => this.setState({ category: [] })}
          >
            Reset Category
          </button>
        </div>
      </div>
    );
  }
}

export default EditPostCont;
