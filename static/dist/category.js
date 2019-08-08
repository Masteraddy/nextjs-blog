import React, { useState, useContext } from "react";
import MainCard from "../../components/Components/MainCard";
import ReactPaginate from "react-paginate";
import { api } from "../../lib/config";
import ApiContext from "../../components/ApiContext";
import Head from "../../components/Layout/Head";

const IndexPage = props => {
  const [post, setPost] = useState(props.posts);
  const [data, setdata] = useState(props.data);
  const [dpage, setpage] = useState(props.page);
  const [totalPg, settotalPg] = useState(props.totalPages);
  const apis = useContext(ApiContext);
  const desc = apis.shortabout;
  const handlePageClick = datas => {
    console.log(props);
    const sel = datas.selected + 1;
    const { page, data, totalPages, total } = api.Paginator(post, sel, 10);
    setdata(data);
    setpage(page);
    settotalPg(totalPages);
  };

  return (
    <div className="row" style={{ margin: "15px 5px 15px 5px" }}>
      <Head
        title={`${props.posts[0].category[0]} Category Posts`}
        brandname={apis.brandname}
        description={desc}
      />
      <h1>{`${props.posts[0].category[0]} Category Posts`}</h1>
      {data.map(data => (
        <div className="col-12" key={data._id}>
          <MainCard post={data} />
        </div>
      ))}
      <div className="center col-12" style={{ paddingTop: "1rem" }}>
        {/* <ul className="pagination">
          <li>
            <a href="#">«</a>
          </li>
          <li>
            <a href="#">1</a>
          </li>
          <li>
            <a className="active" href="#">
              2
            </a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#">4</a>
          </li>
          <li>
            <a href="#">5</a>
          </li>
          <li>
            <a href="#">»</a>
          </li>
        </ul> */}
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPg}
          marginPagesDisplayed={0}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeLinkClassName={"active"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

IndexPage.getInitialProps = async ({ query: { id } }) => {
  const posts = await api.getPost();
  const cate = await api.getCate(posts, id);
  const { page, data, totalPages, total } = api.Paginator(cate, 1, 10);
  // console.log(posts);
  return { posts: cate, page, data, total, totalPages };
};

export default IndexPage;
