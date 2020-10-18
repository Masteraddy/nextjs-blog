import React from "react";
import fetch from "isomorphic-unfetch";
const URL = "http://api.quotable.io/random"

const DailyQuote = () => {
let quote = {};
 fetch(URL)
    .then(res => res.json())
    .then(dt => quote = dt)
  return (
    <div className="card">
      <h2>Word On Marble</h2>
      <h2>
        <i>
          {quote.content}
          - By {quote.author}
        </i>
      </h2>
    </div>
  );
};

export default DailyQuote;
