import fetch from "isomorphic-unfetch";
import _ from "lodash";
import cookie from "react-cookies";
const proxyurl =
  "https://cors-anywhere.herokuapp.com/https://myblogapi.yourusername.now.sh";
const mainurl = "http://localhost:5000";
const adurl = "http://localhost:5001";
const url3 = mainurl;
export const url2 = adurl;
const url = mainurl;

export const api = {
  getPost: async () => {
    const api = await fetch(`${url}`);
    const posts = await api.json();
    return posts;
  },
  putPost: post => {
    const token = cookie.load("mk-token");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token) {
      headers["x-auth-token"] = token;
    }
    fetch(`${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(post),
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  },
  patchPost: (post, id) => {
    const token = cookie.load("mk-token");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token) {
      headers["x-auth-token"] = token;
    }
    fetch(`${url3}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(post),
    })
      .then(res => res.json())
      .then(data => alert("Edited data"))
      .catch(err => console.log(err));
  },
  delPost: id => {
    const token = cookie.load("mk-token");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token) {
      headers["x-auth-token"] = token;
    }
    fetch(`${url3}/${id}`, {
      method: "DELETE",
      headers,
    })
      .then(res => res.json())
      .then(data => alert("Post Deleted"))
      .catch(err => console.log(err));
  },
  showPost: (allapi, pageUrl) => {
    const final = allapi.find(data => data.url === pageUrl);
    // console.log(final);
    return final;
  },
  prevNextPost: (allapi, pageUrl) => {
    const index = allapi.findIndex(data => data.url === pageUrl);
    const next = index - 1;
    const prev = index + 1;
    const nextpost = allapi[next];
    const prevpost = allapi[prev];
    var npost;
    var ppost;
    if (typeof nextpost !== "undefined") {
      npost = { title: nextpost.title, url: nextpost.url };
    }
    if (typeof prevpost !== "undefined") {
      ppost = { title: prevpost.title, url: prevpost.url };
    }
    return { npost, ppost };
  },
  showePost: (allapi, postId) => {
    const final = allapi.find(data => data._id === postId);
    return final;
  },
  Paginator: (items, page, perpage) => {
    var page = page || 1,
      perpage = perpage || 10,
      offset = (page - 1) * perpage,
      paginatedItems = items.slice(offset).slice(0, perpage),
      totalPages = Math.ceil(items.length / perpage);

    return {
      page,
      perpage,
      total: items.length,
      totalPages,
      data: paginatedItems,
    };
  },

  getCate: async (allapi, cate) => {
    const posts = await [...allapi];
    posts.forEach(post => {
      post.category = post.category.filter(data => data == cate);
    });
    const post = posts.filter(data => data.category.length !== 0);
    // console.log(post);
    return post;
  },

  // For User Api

  getUser: async () => {
    const token = cookie.load("mk-token");
    const id = cookie.load("x-undermi-jv");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token && id) {
      headers["x-auth-token"] = token;
    }
    const api = await fetch(`${url2}/admin/`, headers);
    const posts = await api.json();
    return posts;
  },
  postUser: user => {
    fetch(`${url2}/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        if (typeof data.token !== "undefined") {
          cookie.save("mk-token", data.token, { path: "/", maxAge: 3595 });
          cookie.save("x-undermi-jv", data.user.id, {
            path: "/",
            maxAge: 3595,
          });
          alert("Logged In");
        }
      })
      .catch(err => console.log(err));
  },
  putUser: user => {
    fetch(`${url2}/admin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        alert(data);
      })
      .catch(err => console.log(err));
  },
  patchUser: (user, id) => {
    const token = cookie.load("mk-token");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token) {
      headers["x-auth-token"] = token;
    }
    fetch(`${url2}/admin/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => alert("Done"))
      .catch(err => console.log(err));
  },
  delUser: id => {
    const token = cookie.load("mk-token");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token) {
      headers["x-auth-token"] = token;
    }
    fetch(`${url2}/admins/${id}`, {
      method: "DELETE",
      headers,
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  },
};

export const tokenConfig = () => {
  // Get token from localstorage
  const token = cookie.load("mk-token");

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // if token add to header
  if (token) {
    headers["x-auth-token"] = token;
  }
  return config;
};

// const category = _.filter(allapi, n => {
//   return _.some(n.category, de => {
//     console.log(`${de} and ${cate}`);
//     return de === cate;
//   });
// });
// const final = allapi.map(arr => {
//   console.log(arr);
//   return arr.category.filter(de => {
//     console.log(`${de} and ${cate}`);
//     return de === cate;
//   });
// });
