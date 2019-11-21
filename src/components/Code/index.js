import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

const customStyle = {
  fontSize: 14,
  borderRadius: 2,
  padding:'0.8em'
};

const lineNumberStyle = {
    color:'#929090'
}

const Code = props => {
  const value = props.value;
  return (
    <SyntaxHighlighter
      customStyle={customStyle}
      lineNumberStyle={lineNumberStyle}
      useInlineStyles={true}
      language="javascript"
      showLineNumbers={true}
      style={okaidia}
    >
      {value}
    </SyntaxHighlighter>
  );
};

export default Code;
