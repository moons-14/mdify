import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CustomMarkdownRendererProps {
  markdown: string;
  baseUrl?: string;
}

const CustomMarkdownRenderer: React.FC<CustomMarkdownRendererProps> = ({ markdown, baseUrl = '' }) => {
  const components: Components = {
    a: ({ children, href, ...props }) => {
      let fullUrl = href || '';
      if (baseUrl && href && !href.startsWith('http') && !href.startsWith('//')) {
        fullUrl = new URL(href, baseUrl).toString();
      }
      return (
        <a target="_blank" href={fullUrl} rel="noopener noreferrer" {...props}>
          {children}
        </a>)
    }
    ,
    img: ({ src, ...props }) => {
      let fullSrc = src || '';
      if (src && !src.startsWith('http') && !src.startsWith('https')) {
        fullSrc = new URL(src, baseUrl).toString();
      }
      return (
        <img
          src={fullSrc}
          style={{ maxWidth: '200px', height: 'auto' }}
          {...props}
          alt={props.alt || ''}
        />
      );
    },
    //@ts-expect-error - code block
    code: ({ inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          //@ts-expect-error - code block
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <ReactMarkdown
      className="prose max-w-max"
      components={components}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default CustomMarkdownRenderer;