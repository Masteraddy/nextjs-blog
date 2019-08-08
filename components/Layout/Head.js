import React from "react";
import NextHead from "next/head";
import { string } from "prop-types";

const defaultDescription = "";
const defaultOGURL = "";
const defaultOGImage = "";

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{`${props.title} - ${props.brandname}` || props.brandname}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" sizes="192x192" href="/static/favicon.png" />
    <link rel="apple-touch-icon" href="/static/favicon.png" />
    <link rel="icon" href="/static/favicon.ico" />
    <meta name="theme-color" content={props.barcolor} />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta
      property="og:title"
      content={`${props.title} - ${props.brandname}` || props.brandname}
    />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />

    <link rel="stylesheet" href="/static/main.css" />
    <link rel="stylesheet" href="/static/dist/css/all.css" />
    <link rel="stylesheet" href="/static/dist/nprogress.css" />
    <link rel="stylesheet" href="/static/quill/quill.bubble.css" />
    <link rel="stylesheet" href="/static/quill/quill.core.css" />
    <link rel="stylesheet" href="/static/quill/quill.snow.css" />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <script
      async
      src={`https://platform-api.sharethis.com/js/sharethis.js#property=5d3ca7861361770012b04d42&product="sticky-share-buttons"`}
    />
    <script id="dsq-count-scr" src="//quoracompile.disqus.com/count.js" async />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  brandname: string,
  url: string,
  ogImage: string,
  barcolor: string,
};

export default Head;
