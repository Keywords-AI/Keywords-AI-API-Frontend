import React from 'react';
import ReactMarkdown from 'react-markdown';
import "./static/css/style.css";

export default function ChatbotReactMarkdown({ content }) {
  return (
    <ReactMarkdown
      children={content}
      components={{
        pre: ({ node, ...props }) => (
          <pre {...props} className="format-pre" />
        ),
        p: ({ node, ...props }) => (
          <p {...props} className="text-sm" />
        ),
        ul: ({ node, ...props }) => (
          <ul {...props} className="format-ul" />
        ),
      }}
    />
  );
}
