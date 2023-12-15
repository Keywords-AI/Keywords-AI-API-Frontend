import React from 'react';
import originalReactMarkdown from 'react-markdown';
import "./static/css/style.css";

export default function ReactMarkdown({ content }) {
  return (
    <originalReactMarkdown
      children={content}
      components={{
        pre: ({ node, ...props }) => (
          <pre {...props} className="format-pre" />
        ),
        p: ({ node, ...props }) => (
          <p {...props} className="text-md" />
        ),
      }}
    />
  );
}
