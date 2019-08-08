const cont = useContext(ApiContext);
const date = Date.now().toString(32);
const [username, setusername] = useState("Jay Cruz");
const [title, settitle] = useState("");
const [post, setpost] = useState("");
const [url, seturl] = useState("");
const options = [
  "Technology",
  "Cryptocurrency",
  "Bussiness",
  "Blogging",
  "Designing",
  "Programming",
];
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
// if (typeof window !== "undefined") {
//   this.quill = require("react-quill");
// }

// if (typeof window !== "undefined" && quill) {
//   var daform = (
//     <Quill
//       style={{ minHeight: 100 }}
//       name="post"
//       placeholder="Describe your post"
//       onChange={e => setpost(e)}
//       formats={formats}
//       modules={modules}
//     />
//   );
// } else {
//   var daform = (
//     <textarea
//       name="post"
//       className="textarea"
//       value={post}
//       onChange={e => setpost(e.target.value)}
//     />
//   );
// }
var daform = (
  <textarea
    name="post"
    className="textarea"
    value={post}
    onChange={e => setpost(e.target.value)}
  />
);
const formats = [
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

const loader = async () => {
  const user = await cont.user;
  if (typeof user !== "undefined") {
    setusername(user.username);
  }
};
const [category, setcategory] = useState([]);
if (typeof window !== "undefined") {
  const token = cookie.load("mk-token");
  const id = cookie.load("x-undermi-jv");
  if (!token && !id) {
    Router.push("/admin2login");
    return null;
  }
}
// console.log(date);
const handleSubmit = e => {
  e.preventDefault();
  var mypost = {
    username,
    title,
    post,
    category,
    url,
  };
  // this.props.addPost(mypost);
  settitle("");
  setpost("");
  seturl("");
  setcategory([]);
  api.putPost(mypost);
  console.log(mypost);
  Router.push("/adminin");
};

const handleCate = e => {
  var cate = [e, ...category];
  var test = [...new Set(cate)];
  setcategory(test);
};

const handleUrl = e => {
  var title = e.target.value;
  title = title.replace(/[^a-zA-Z0-9-]+/g, "-");
  var url = date + "-" + title.toLowerCase();
  seturl(url);
};
