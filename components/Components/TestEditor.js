import React from "react";
import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
const MOCK_DATA =
  "Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it.";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const TextEditor = () => {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const handleEditorChange = ({ html, md }) => {
    console.log("handleEditorChange", html);
  };
  return (
    <div style={{ height: "500px" }}>
      <MdEditor
        value={MOCK_DATA}
        renderHTML={text => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;
