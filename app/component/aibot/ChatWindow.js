import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import mermaid from "mermaid";

export default function ChatWindow({ messages }) {
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
  });
  return (
    <div className="flex flex-col h-5/6 bg-white border rounded p-12 overflow-auto gap-10">
      {messages.map((msg, index) =>
        msg.type === "user" ? (
          <div key={index} className=" text-white  relative text-right ">
            <span className="absolute -top-8 text-gray-400 right-3 text-sm">
              我
            </span>
            <span className="bg-blue-900 rounded-lg p-4  md:text-lg max-w-max">
              {msg.message}
            </span>
          </div>
        ) : (
          <div
            key={index}
            className="relative md:text-lg w-max rounded-lg bg-gray-200 text-gray-700 p-4"
          >
            <span className="absolute -top-8 text-gray-400 left-3 text-sm">
              AI专家
            </span>
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
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => mermaid.run()}
                      >
                        代码转图表
                      </button>
                    </>
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {msg.message}
            </Markdown>
          </div>
        )
      )}
    </div>
  );
}
