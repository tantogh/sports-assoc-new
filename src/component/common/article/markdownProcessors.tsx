import React from "react";

// ユーティリティ関数

export const toCamelCase = (property: string): string =>
  property.trim().replace(/-([a-z])/g, (_, char) => char.toUpperCase());

export const parseStyleAttribute = (styles: string): React.CSSProperties => {
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

// スタック用の型定義
type StackNode =
  | { type: "root"; children: React.ReactNode[] }
  | { type: "u"; children: React.ReactNode[] }
  | { type: "span"; children: React.ReactNode[]; style?: React.CSSProperties };

/**
 * インラインタグを処理（<u>、<span style="...">）
 */
export const processInlineTags = (text: string): React.ReactNode[] => {
  const tokens = text.split(/(<\/?u>|<span\b[^>]*>|<\/span>)/gi);
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

/**
 * Bold テキストを処理（**...**）
 */
const processBoldText = (line: string): React.ReactNode[] => {
  const elements: React.ReactNode[] = [];
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
      innerNodes.forEach((n, j) =>
        elements.push(<React.Fragment key={`p-${idx}-${j}`}>{n}</React.Fragment>)
      );
    }
  });

  return elements;
};

/**
 * 1行のテキストを処理（bold + インラインタグ）
 */
export const processLine = (line: string): React.ReactNode => {
  const elements = processBoldText(line);
  return <>{elements}</>;
};

/**
 * タイトル全体を処理（<br /> で改行）
 */
export const processTitle = (text: string): React.ReactNode => {
  return text.split("<br />").map((line, index, array) => (
    <span key={index}>
      {processLine(line)}
      {index < array.length - 1 && <br />}
    </span>
  ));
};
