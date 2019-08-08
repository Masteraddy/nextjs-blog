import App, { Container } from "next/app";
import ApiContext from "../components/ApiContext";
import Router from "next/router";
import { register, unregister } from "next-offline/runtime";
// import Loader from "../components/Layout/Loader";
// import { PageTransition } from "next-page-transitions";
import NProgress from "nprogress";
import Layout from "../components/Layout/Layout";
import fetch from "isomorphic-unfetch";
import cookie from "react-cookies";
import { api, url2 } from "../lib/config";

Router.events.on("routeChangeStart", url => {
  // console.log(`Loading ${url}`);
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const TIMEOUT = 100;

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  state = {
    brandname: "PostLyst",
    nightmode: false,
    bgColor: "#ffffff",
    tColor: "#ffffff",
    cColor: "#ffffff",
    color: "#444",
    visible: false,
    posts: [],
    recpost: [],
    recentpostsno: 8,
    user: null,
    category: [
      "Technology",
      "Cryptocurrency",
      "Bussiness",
      "Blogging",
      "Designing",
      "Programming",
    ],
    page: [
      { name: "Home", url: "/" },
      { name: "About", url: "/about" },
      { name: "Contact", url: "/contact" },
      { name: "Privacy", url: "/privacy-policy" },
    ],
    title: "PostLyst Pages",
    socials: {
      facebook: "masteraddy",
      pinterest: "addyisaiah",
      github: "masteraddy",
      twitter: "itsmasteraddy",
    },
    aboutAuthor:
      "Hi I'm Isaiah, friends call me Addy. I'm a student with little experence but I like to share that little with others. Let's rock and roll. **Yay**",
    about:
      "Hi, I'm Isaiah, This is a simple blogging site owned by me. Where I will share some tips learned through my life. PostLyst was created by me Isaiah Ayomide. You are strongly Welcome **wink**",
  };

  async componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch(err => console.error("Service worker registration failed", err));
    } else {
      console.log("Service worker not supported");
    }
    const { recentpostsno } = this.state;
    const posts = await api.getPost();
    const recpost = await posts.slice(0, recentpostsno);
    this.userLoad();
    this.setState({ posts, recpost });
  }

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
        .then(user => this.setState({ user }))
        .catch(err => console.error(err));
    }
  };

  // Toggle color for Night Mode
  toggleNm = () => {
    if (this.state.nightmode !== true) {
      this.setState({
        bgColor: "#000000da",
        tColor: "#000000",
        cColor: "#000000",
        color: "gray",
      });
    } else {
      this.setState({
        bgColor: "#ffffff",
        tColor: "#ffffff",
        cColor: "#ffffff",
        color: "#444",
      });
    }
    this.setState({ nightmode: !this.state.nightmode });
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleShowClick = () => this.setState({ visible: !this.state.visible });
  setTitle = title => this.setState({ title });
  render() {
    const { Component, pageProps } = this.props;
    const { activeItem, visible } = this.state;

    return (
      <Container>
        <ApiContext.Provider
          value={{
            posts: this.state.posts,
            recpost: this.state.recpost,
            user: this.state.user,
            getUser: this.userLoad,
            category: this.state.category,
            page: this.state.page,
            brandname: this.state.brandname,
            aboutAuthor: this.state.aboutAuthor,
            shortabout: this.state.about,
            bgColor: this.state.bgColor,
            tColor: this.state.tColor,
            toggleNm: this.toggleNm,
            setTitle: this.setTitle,
            socials: this.state.socials,
          }}
        >
          {/* C:\Users\EliteAddy\Documents\Node.js Files\AaBlog\Blog\addyjayblog\static\font-awesome\css\fontawesome.min.css */}
          <Layout
            nightmode={this.state.nightmode}
            bname={this.state.brandname}
            title={this.state.title}
          >
            <Component {...pageProps} />
          </Layout>
        </ApiContext.Provider>
        <style jsx global>{`
          body {
            color: ${this.state.color};
            background-color: ${this.state.bgColor} !important;
            margin: 0;
            padding: 0;
            height: 100%;
            background: #eee;
          }
          /* Add a card effect for articles */

          .card {
            background-color: ${this.state.cColor} !important;
            box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.2);
            padding: 15px;
            margin: 15px;
            margin-top: 20px;
          }

          .maincard {
            background-color: ${this.state.cColor} !important;
            box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.2);
            padding: 0px;
            margin: 5px;
            text-align: center;
            margin-top: 10px;
          }
          .aboutcard {
            background-color: ${this.state.cColor} !important;
            box-shadow: 3px 5px 5px 5px rgba(0, 0, 0, 0.2);
            padding: 20px;
            margin: 10px;
            margin-top: 20px;
          }
          /* Footer */

          .footer {
            padding: 20px;
            text-align: center;
            background: ${this.state.cColor} !important;
            box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
            color: #444;
            margin-top: 20px;
          }
          ul.pagination li a {
            color: #444;
            float: left;
            padding: 8px 16px;
            text-decoration: none;
            background-color: ${this.state.cColor} !important;
            transition: background-color 0.3s;
          }
          .page-transition-enter {
            opacity: 0.25;
            transform: translate3d(0, 20px, 0);
          }
          .page-transition-enter-active {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0.25;
            transition: opacity ${TIMEOUT}ms;
          }
          .loading-indicator-appear,
          .loading-indicator-enter {
            opacity: 0.25;
          }
          .loading-indicator-appear-active,
          .loading-indicator-enter-active {
            opacity: 1;
            transition: opacity ${TIMEOUT}ms;
          }
        `}</style>
      </Container>
    );
  }
}

export default MyApp;
