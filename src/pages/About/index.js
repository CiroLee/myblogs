import React, { useState, useEffect } from "react";
import http from "@/utils/http";
import Code from "@/components/Code";
import ReactMarkdown from "react-markdown";
export default props => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    http({
      url: "/articles/我的简历.md",
      method: "get"
    }).then(resp => {
      setContent(resp)
    });
  }, []);
  return (
    <div className="global-wrapper">
      <ReactMarkdown
        source={content}
        escapeHtml={false}
        renderers={{
          code: Code
        }}
      />
    </div>
  );
};
