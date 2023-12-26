import React from 'react';
import ReactMarkdown from 'react-markdown';

export function ChatbotReactMarkdown({ content }) {
  return (
    <ReactMarkdown
      children={content}
      components={{
        pre: ({ node, ...props }) => (
          <pre {...props} className="bg-gray-black" />
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
