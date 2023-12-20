import React from 'react';
import ReactMarkdown from 'react-markdown';

export function DocumentationMarkdown({ children }) {
  return (
    <ReactMarkdown
      children={children}
      components={{
        pre: ({ node, ...props }) => (
          <pre {...props} className="bg-gray-black" />
        ),
        p: ({ node, ...props }) => (
          <p {...props} className="text-md-regular" />
        ),
        ul: ({ node, ...props }) => (
          <ul {...props} className="format-ul" />
        ),
      }}
    />
  );
}
