
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Code } from 'lucide-react';

interface MarkdownViewerProps {
  markdownContent: string;
  searchQuery?: string;
}

// Add types for the code component props to include 'inline'
interface CodeProps {
  node: any;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ 
  markdownContent, 
  searchQuery = '' 
}) => {
  const [content, setContent] = useState(markdownContent);
  
  useEffect(() => {
    if (!searchQuery) {
      setContent(markdownContent);
      return;
    }

    // Highlight search term
    try {
      const regex = new RegExp(`(${searchQuery})`, 'gi');
      const highlightedContent = markdownContent.replace(
        regex,
        '<span style="background-color: #FBCFE8;">$1</span>'
      );
      setContent(highlightedContent);
    } catch (error) {
      // If regex has special characters, just use the original content
      setContent(markdownContent);
    }
  }, [markdownContent, searchQuery]);

  return (
    <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none p-6 overflow-y-auto">
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-2" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-medium mt-6 mb-3 text-gray-800" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-primary hover:text-primary/80 underline" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }: CodeProps) => {
            if (inline) {
              return (
                <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800 font-mono text-sm" {...props}>
                  {children}
                </code>
              );
            }

            return (
              <div className="relative bg-gray-900 rounded-md overflow-hidden mb-6 mt-4">
                <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-gray-400">
                  <span className="text-xs font-mono">{className?.replace(/language-/, '') || 'code'}</span>
                  <Code className="h-4 w-4" />
                </div>
                <pre className="p-4 overflow-x-auto text-gray-300 font-mono text-sm">
                  <code {...props}>{children}</code>
                </pre>
              </div>
            );
          },
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full mb-6" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
          th: ({ node, ...props }) => (
            <th className="border border-gray-300 px-4 py-2 text-left" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-gray-300 px-4 py-2" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
