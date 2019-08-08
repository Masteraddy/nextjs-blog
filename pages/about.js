import { Component } from "react";
import Link from "next/link";
import Head from "../components/Layout/Head";

class AboutPage extends Component {
  static getInitialProps() {
    const isServer = typeof window === "undefined";
    return { isServer };
  }

  render() {
    return (
      <div className="card">
        <Head
          title="About Us"
          brandname="HayHiHay"
          description="Hi, I'm Isaiah, This is a simple blogging site owned by me. Where I
          will share some tips learned through my life. This Site was designed and created by me Isaiah Ayomide"
        />
        <h1>About</h1>
        <div>
          <p>
            Hi, I'm Isaiah, This is a simple blogging site owned by me. Where I
            will share some tips learned through my life. <b>PostLyst</b> was
            designed, created and built by me <b>Isaiah Ayomide</b>, This Site
            was built from scratch with **React, Nextjs, Node.js etc.** Let me
            not forget, I'm still a student. But, I do multitask. As a student I
            still learn some things during my free time. You are strongly
            Welcome **wink**
          </p>
          <p>
            I am a student who loves sharing his new experience basically on how
            I do programming as a Student in which you also can do even if you
            are not a student anymore. Stay tune and check my new blog posts.
          </p>
          <p>You can also check my other pages like contact e.t.c</p>
        </div>
      </div>
    );
  }
}

export default AboutPage;
