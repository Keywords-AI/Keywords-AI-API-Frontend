import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function DocumentationMarkdown({ children, components={} }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      children={children}
      components={{
        pre: ({ node, ...props }) => (
          <pre {...props} className="bg-gray-black" />
        ),
        code: ({ node, ...props }) => (
          <code {...props} className="bg-gray-black whitespace-pre-wrap break-words" />
        ),
        p: ({ node, ...props }) => (
          <p {...props} className="text-md-regular" />
        ),
        a: ({ node, ...props }) => (
          <a {...props} className="text-primary" />
        ),
        ...components
      }}
    />
  );
}
