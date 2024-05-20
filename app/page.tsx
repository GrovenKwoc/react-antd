"use client";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import mermaid from "mermaid";

import { useState } from "react";
export default function Page() {
  const [text, setText] = useState("");
  mermaid.initialize({ startOnLoad: false });

  return (
    <div className="container mx-auto h-dvh flex-col flex">
      <header>Markdown解析测试</header>
      <main className="h-5/6 flex flex-col justify-between">
        <article className="w-full h-2/3 border-2 border-gray-300 rounded-md flex-none overflow-auto">
          <Markdown
            remarkPlugins={[[remarkGfm], [remarkMath]]}
            rehypePlugins={[rehypeKatex]}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match && match[1] !== "mermaid" ? (
                  <SyntaxHighlighter
                    PreTag="div"
                    language={match[1]}
                    style={dark}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : match && match[1] == "mermaid" ? (
                  <>
                    <pre className="mermaid">{children}</pre>
                  </>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {text}
          </Markdown>
        </article>
        <textarea
          className="w-full h-1/3 flex-none"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => mermaid.run()}
        >
          生成流程图
        </button>
      </main>
    </div>
  );
}
