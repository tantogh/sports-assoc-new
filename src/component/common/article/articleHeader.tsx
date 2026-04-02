// src/_components/archives/articleHeader.tsx

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import React from "react";

import { notoSerifJP } from "@/component/utils/fonts/fonts";

type ArticleHeaderProps = {
  baseDir: string;     // e.g. "articles/"
  filePath: string;    // e.g. "2018/01/example.md"
  href: string;
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

const ArticleHeader = ({ baseDir, filePath, href }: ArticleHeaderProps) => {
  const fullPath = path.join(process.cwd(), "content", baseDir, filePath);
  const raw = fs.readFileSync(fullPath, "utf8");

  const { content } = matter(raw);

  // 最初の # 見出しをタイトルにする
  const match = content.match(/^# (.+)$/m);
  const title = match ? match[1] : "タイトルなし";

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
    <Link href={href}>
      <div
        className={`text-xl font-bold p-1 bg-white border ${notoSerifJP.className}`}
      >
        {processTitle(title)}
      </div>
    </Link>
  );
};

export default ArticleHeader;
