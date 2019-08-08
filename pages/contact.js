import { Component } from "react";
import Router from "next/router";
import Head from "../components/Layout/Head";

class ContactPage extends Component {
  static getInitialProps() {
    const isServer = typeof window === "undefined";
    return { isServer };
  }

  handleSubmit = () => {
    e.preventDefault();
    Router.push("/");
  };

  render() {
    return (
      <div className="card">
        <Head
          title="Contact"
          brandname="HayHiHay"
          description="This is my contact page. Contact me through email or the boxes below."
        />
        <h1>Contact Me</h1>
        <h5 style={{ color: "red" }}>
          You can send an email directly to me
          <a href="mailto:aiadesile@gmail.com"> By Clicking here</a> or Contact
          me through the form below.
        </h5>
        <div>
          <form
            method="POST"
            action="https://formspree.io/aiadesile@gmail.com"
            onSubmit={this.handleSubmit}
          >
            <label>Email: </label>
            <input type="text" name="email" />
            <label>Name: </label>
            <input type="text" name="url" />
            <label>Post Content: </label>
            <textarea name="post" className="textarea" />
            <button
              className="btn greenbtn"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ContactPage;
