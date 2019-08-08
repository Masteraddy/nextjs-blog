import React, { Component } from "react";
import { api, url2 } from "../../lib/config";
import cookie from "react-cookies";
import Router from "next/router";
import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

class AddPostCont extends Component {
  state = {
    username: "",
    title: "",
    setquil: false,
    post: "",
    url: "",
    category: [],
    options: this.props.options,
  };

  async componentDidMount() {
    this.userLoad();
  }

  mdParser = new MarkdownIt(/* Markdown-it options */);

  handleEditorChange = ({ html, md }) => {
    this.setState({ post: html });
  };

  handleChange = e => {
    console.log(this.state.username);
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

  userLoad = () => {
    const token = cookie.load("mk-token");
    const id = cookie.load("x-undermi-jv");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token && id) {
      headers["x-auth-token"] = token;
      fetch(`${url2}/admin`, {
        method: "GET",
        headers,
      })
        .then(res => res.json())
        .then(user => this.setState({ username: user.username }))
        .catch(err => console.error(err));
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

  render() {
    const { openmodal, url, options, title, post, category } = this.state;

    // console.log(openmodal);
    return (
      <div>
        <h2>AddPost Page</h2>
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
                value=""
                renderHTML={text => this.mdParser.render(text)}
                onChange={this.handleEditorChange}
              />
            </div>
            {/* <label className="switch">
              <input type="checkbox" onChange={this.sethandler} />
              <div className="slider round" />
            </label> */}
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

export default AddPostCont;
