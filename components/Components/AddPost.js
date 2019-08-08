import React, { Component } from "react";
import cookie from "react-cookies";
import Router from "next/router";
import { api } from "../../lib/config";

class AddPostModal extends Component {
  state = {
    username: "Jay Cruz",
    title: "",
    setquil: false,
    post: "",
    url: "",
    category: [],
  };
  options = [
    "Technology",
    "Cryptocurrency",
    "Bussiness",
    "Blogging",
    "Designing",
    "Programming",
  ];
  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };
  sethandler = () => {
    this.setState({ setquil: !this.state.setquil });
  };
  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  handleQuill = value => {
    this.setState({ post: value });
  };

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
    api.putPost(mypost);
    console.log(mypost);
    this.handleClose();
  };

  handleUrl = e => {
    var title = e.target.value;
    const date = Date.now().toString(32);
    title = title.replace(/[^a-zA-Z0-9-]+/g, "-");
    var url = date + "-" + title.toLowerCase();
    this.setState({
      url,
    });
  };
  handleCate = e => {
    var cate = [e.target.value, ...this.state.category];
    var test = [...new Set(cate)];
    this.setState({ category: test });
  };

  handleClose = e => {
    this.props.closer();
  };

  render() {
    const {
      openmodal,
      url,
      username,
      setquil,
      title,
      post,
      category,
    } = this.state;

    if (typeof window !== "undefined") {
      this.quill = require("react-quill");
    }
    const Quill = this.quill;
    if (typeof window !== "undefined" && Quill) {
      var daform = setquil ? (
        <Quill
          style={{ minHeight: "3rem", height: "7rem", marginBottom: "5rem" }}
          name="post"
          placeholder="Describe your post"
          value={post}
          onChange={this.handleQuill}
          formats={this.formats}
          modules={this.modules}
        />
      ) : (
        <textarea
          name="post"
          className="textarea"
          value={post}
          onChange={this.handleChange}
        />
      );
    } else {
      var daform = (
        <textarea
          name="post"
          className="textarea"
          value={post}
          onChange={this.handleChange}
        />
      );
    }

    // console.log(openmodal);
    return (
      <div
        className="modal"
        style={{ display: this.props.open ? "block" : "none" }}
      >
        {/* Modal content */}
        <div className="modal-content">
          <div className="modal-body">
            <button
              className="close"
              style={{ backgroundColor: "red", padding: "0.5rem" }}
              onClick={this.handleClose}
            >
              ×
            </button>
            <h2>AddPost Page</h2>
            <div>
              <form onSubmit={this.handleSubmit}>
                <label>Post Title</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                />
                <input
                  type="text"
                  name="url"
                  value={url}
                  onChange={this.handleChange}
                />
                <label>Post Content</label>
                {daform}
                <input type="checkbox" onChange={this.sethandler} />
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
                  {this.options.map(val => (
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
        </div>
      </div>
    );
  }
}

export default AddPostModal;
