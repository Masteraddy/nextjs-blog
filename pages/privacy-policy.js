import { Component } from "react";
import Link from "next/link";
import Head from "../components/Layout/Head";

class PrivacyPage extends Component {
  static getInitialProps() {
    const isServer = typeof window === "undefined";
    return { isServer };
  }

  render() {
    return (
      <div className="card">
        <Head title="Privacy Policy" brandname="Jay Cruz World" description="The privacy, terms and condition of this working website" />
        <h1>Privacy Policy</h1>
        <div>
          <p>
            No Privacy Policy yet because I'm not collecting any data on this
            site, so it is free from all sort of privacy bypassing.
          </p>
          <p>
            The only place that involve privacy is the third party sites (i.e
            Site refered to due to affiliate referrer) and this site will not be
            held responsible for any identity theft encounter due to third party
            sites. But we will make sure we refer you to only trusted sites
          </p>
          <p>
            Any content or post copied on this site show not be modified and
            should have a link back to this site as a referer.
          </p>
          <p>
            I am a student who loves sharing his new experience basically on how
            I earn money as a Student in which you also can do even if you are
            not a student anymore. Stay tune and check my new blog posts.
          </p>
          <p>You can also check my other pages like contact e.t.c</p>
        </div>
      </div>
    );
  }
}

export default PrivacyPage;
