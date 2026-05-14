// src/component/common/article/articleHeader.tsx

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import React from "react";

import { notoSerifJP } from "@/component/utils/fonts/fonts";

type ArticleHeaderProps = {
  baseDir: string;     // e.g. "articles/"
  filePath: string;    // e.g. "2018/01/2018-01-01.md"
};

const toCamelCase = (property: string) => property.trim().replace(/-([a-z])/g, (_, char) => char.toUpperCase());

const parseStyleAttribute = (styles: string): React.CSSProperties => {
  const styleObject: React.CSSProperties = {};
  const trimmed = styles.trim();

  if (!trimmed) return styleObject;

  trimmed.split(";").forEach((rule) => {
    const [prop, rawValue] = rule.split(":");
    if (!prop || !rawValue) return;

    const camelProp = toCamelCase(prop);
    (styleObject as Record<string, string>)[camelProp] = rawValue.trim();
  });

  return styleObject;
};

const processInlineTags = (text: string) => {
  const tokens = text.split(/(<\/?u>|<span\b[^>]*>|<\/span>)/gi);
  type StackNode =
    | { type: "root"; children: React.ReactNode[] }
    | { type: "u"; children: React.ReactNode[] }
    | { type: "span"; children: React.ReactNode[]; style?: React.CSSProperties };

  const stack: StackNode[] = [{ type: "root", children: [] }];

  const appendChild = (node: React.ReactNode) => {
    stack[stack.length - 1].children.push(node);
  };

  tokens.forEach((token) => {
    if (!token) return;

    const normalized = token.toLowerCase();

    if (normalized === "<u>") {
      stack.push({ type: "u", children: [] });
      return;
    }

    if (normalized === "</u>") {
      const node = stack.pop();
      if (node && node.type === "u") {
        appendChild(<u className="underline">{node.children}</u>);
      }
      return;
    }

    if (/^<span\b[^>]*>$/i.test(token)) {
      const styleMatch = token.match(/style\s*=\s*["']([^"']*)["']/i);
      const style = styleMatch ? parseStyleAttribute(styleMatch[1]) : undefined;
      stack.push({ type: "span", children: [], style });
      return;
    }

    if (normalized === "</span>") {
      const node = stack.pop();
      if (node && node.type === "span") {
        appendChild(<span style={node.style}>{node.children}</span>);
      }
      return;
    }

    appendChild(token);
  });

  return stack[0].children;
};

const processLine = (line: string) => {
  // サポートするインライン構文:
  // - **bold** を <strong> に
  // - <u>...</u> を下線に
  // - <span style="...">...</span> の style 指定を React へ渡す
  // まず ** を分割して、各パートでタグを処理する

  const elements: React.ReactNode[] = [];
  // **...** のパターンで分割（括弧キャプチャで ** を含む部分を保持）
  const boldParts = line.split(/(\*\*[^*]+\*\*)/g);

  boldParts.forEach((part, idx) => {
    const m = part.match(/^\*\*(.+)\*\*$/);
    if (m) {
      const inner = m[1];
      const innerNodes = processInlineTags(inner);
      elements.push(
        <strong key={`b-${idx}`} className="font-extrabold">
          {innerNodes}
        </strong>
      );
    } else if (part) {
      const innerNodes = processInlineTags(part);
      innerNodes.forEach((n, j) => elements.push(<React.Fragment key={`p-${idx}-${j}`}>{n}</React.Fragment>));
    }
  });

  return <>{elements}</>;
};

export default function ArticleHeader({ baseDir, filePath }: ArticleHeaderProps) {
  const fullPath = path.join(process.cwd(), "content", baseDir, filePath);
  const href = path.join(baseDir, filePath.replace(/\.md$/, ""));
  const raw = fs.readFileSync(fullPath, "utf8");

  // frontmatter から title を取得し、存在しない場合は最初の # 見出しをタイトルにする
  const { data, content } = matter(raw);
  const match = content.match(/^# (.+)$/m);
  const title = (typeof data.title === 'string' && data.title.length > 0)
    ? data.title
    : (match ? match[1] : "タイトルなし");

  // <br /> を改行として処理
  const processTitle = (text: string) => {
    return text.split('<br />').map((line, index, array) => (
      <span key={index}>
        {processLine(line)}
        {index < array.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="max-w-2xl mx-auto mb-2 p-2 bg-white rounded-xl shadow-lg">
      <Link
        href={href}
        className="group block w-full"
      >
        <div className="flex items-center justify-between gap-4 rounded-md px-3 transition-colors duration-200">
          <div
            className={`text-xs xl:text-xl p-1 text-black transition-colors duration-200 group-hover:text-sky-700 ${notoSerifJP.className}`}
          >
            {processTitle(title)}
          </div>

          <div className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky-700 transition-all duration-200 group-hover:border-sky-300 group-hover:bg-sky-200/60 group-hover:text-sky-800">
            <span>more</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3.25 10a.75.75 0 0 1 .75-.75h10.19l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H4a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};
