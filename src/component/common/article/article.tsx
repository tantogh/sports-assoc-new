// src/component/common/article/article.tsx

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

import { notoSerifJP } from "@/component/utils/fonts/fonts";

type ArticleProps = {
  filename: string;
  isNew?: boolean;
};

// rehype-sanitize の許可スキーマ（必要最小限 + 一部拡張）
const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "u",
    "span",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
  ],
  attributes: {
    ...defaultSchema.attributes,
    a: [
      ...(defaultSchema.attributes?.a ?? []),
      ["className"],
      ["target"],
      ["rel"],
      ["download"],
      ["href"], // 念のため明示
    ],
    img: [
      ...(defaultSchema.attributes?.img ?? []),
      ["className"],
      ["loading"],
      ["decoding"],
      ["src"],
      ["alt"],
      ["title"],
    ],
    code: [...(defaultSchema.attributes?.code ?? []), ["className"]],
    span: [...(defaultSchema.attributes?.span ?? []), ["className"], ["style"]],
    div: [...(defaultSchema.attributes?.div ?? []), ["className"]],
    ul: [...(defaultSchema.attributes?.ul ?? []), ["className"]],
    ol: [...(defaultSchema.attributes?.ol ?? []), ["className"]],
    li: [...(defaultSchema.attributes?.li ?? []), ["className"]],
    p: [...(defaultSchema.attributes?.p ?? []), ["className"]],
    h1: [...(defaultSchema.attributes?.h1 ?? []), ["className"]],
    h2: [...(defaultSchema.attributes?.h2 ?? []), ["className"]],
    h3: [...(defaultSchema.attributes?.h3 ?? []), ["className"]],
    table: [...(defaultSchema.attributes?.table ?? []), ["className"]],
    thead: [...(defaultSchema.attributes?.thead ?? []), ["className"]],
    tbody: [...(defaultSchema.attributes?.tbody ?? []), ["className"]],
    tr: [...(defaultSchema.attributes?.tr ?? []), ["className"]],
    th: [...(defaultSchema.attributes?.th ?? []), ["className"]],
    td: [...(defaultSchema.attributes?.td ?? []), ["className"]],
    u: [...(defaultSchema.attributes?.u ?? []), ["className"]],
  },
} as const;

// カスタムリンク: 内部リンクはLinkでルーティング、PDFやダウンロードファイルはaタグ
const MarkdownLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href || "";
  const { children, ...rest } = props;
  const isInternal =
    href.startsWith("/") || href.startsWith("./") || href.startsWith("../");
  const isPDF = href.toLowerCase().endsWith(".pdf");
  const isJPEG = href.toLowerCase().endsWith(".jpg");
  const isPNG = href.toLowerCase().endsWith(".png");
  const isDownloadFile = href.toLowerCase().match(/\.(pdf|doc|docx|xls|xlsx|zip|rar)$/);

  if (isInternal) {
    // PDFやダウンロードファイルはaタグを使用
    if (isPDF || isJPEG || isPNG || isDownloadFile) {
      if (isPDF || isJPEG || isPNG) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
            {...rest}
          >
            {children}
          </a>
        );
      }
      const downloadName = href.split("/").pop() || href;
      return (
        <a
          href={href}
          download={downloadName}
          className="text-blue-600 hover:text-blue-800 underline"
          {...rest}
        >
          {children}
        </a>
      );
    }

    // その他の内部リンクはNext.jsのLinkを使用
    return (
      <Link
        href={href}
        className="text-blue-600 hover:text-blue-800 underline"
        {...rest}
      >
        {children}
      </Link>
    );
  }

  // 外部リンクはaタグを使用
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline"
      {...rest}
    >
      {children}
    </a>
  );
};

const Article = ({ filename, isNew = false }: ArticleProps) => {
  try {
    const filePath = path.join(process.cwd(), "content", filename);
    const rawText = fs.readFileSync(filePath, "utf8");
    const { content } = matter(rawText);

    return (
      <div className="p-4 m-4 bg-white mx-auto w-full max-w-7xl">
        {isNew && (
          <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold mr-2">
            New
          </span>
        )}
        <article className={`prose prose-ul:list-disc prose-ol:list-decimal prose-li:my-0 prose-li:pl-0 max-w-none ${notoSerifJP.className}
          rounded-xl border border-blue-100 bg-blue-50 p-4 md:p-6 text-slate-800 shadow-md`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
            components={{
              a: MarkdownLink,
              h1: ({ children }) => (
                <h1 className="text-lg sm:text-xl font-bold mt-4 mb-4 bg-sky-100">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-bold mt-4 mb-4">{children}</h2>
              ),
              p: ({ children }) => <p className="my-2">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-6 my-4">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
              li: ({ children }) => <li className="my-1">{children}</li>,
              u: ({ children }) => <u className="underline">{children}</u>,
              table: ({ children }) => (
                <div className="overflow-x-auto my-4">
                  <table className="w-full border-collapse border border-gray-400 text-sm">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-100">
                  {children}
                </thead>
              ),
              tbody: ({ children }) => <tbody>{children}</tbody>,
              tr: ({ children }) => (
                <tr className="border-b last:border-b-0 bg-white">
                  {children}
                </tr>
              ),
              th: ({ children }) => (
                <th className="border border-gray-400 px-2 py-1 text-left font-semibold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-gray-400 px-2 py-1 align-top">
                  {children}
                </td>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    );
  } catch (err) {
    return (
      <div className="p-4 m-4 border bg-red-100 text-red-600 rounded-md">
        Error: {(err as Error)?.message || "File not found"}
      </div>
    );
  }
};

export default Article;
