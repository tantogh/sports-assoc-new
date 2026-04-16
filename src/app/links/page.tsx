// src/app/links/page.tsx
import { Metadata } from "next";
import fs from "node:fs/promises";
import path from "path";

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "リンク集",
  description: "関係団体・関連サイトへのリンク集です。",
};

type LinkItem = {
  name: string;
  url: string;
};

type LinksData = Record<string, LinkItem[]>;

const categoryLabels: Record<string, string> = {
  ishikawa_prefecture: "石川県",
  member_organizations: "加盟団体",
  related_organizations: "関連団体",
  national_organizations: "全国",
};

const formatCategoryName = (key: string) => {
  return (
    categoryLabels[key] ??
    key
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
};

const loadLinksData = async (): Promise<LinksData> => {
  const filePath = path.join(process.cwd(), "content", "links", "links.json");

  try {
    const json = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(json) as unknown;

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("links.json の形式が不正です。");
    }

    const validated: LinksData = {};

    for (const [category, value] of Object.entries(parsed)) {
      if (!Array.isArray(value)) {
        throw new Error(`カテゴリ "${category}" の値が配列ではありません。`);
      }

      validated[category] = value.map((item, index) => {
        if (!item || typeof item !== "object") {
          throw new Error(
            `カテゴリ "${category}" の ${index + 1} 件目のデータ形式が不正です。`,
          );
        }

        const { name, url } = item as Partial<LinkItem>;

        if (typeof name !== "string" || typeof url !== "string") {
          throw new Error(
            `カテゴリ "${category}" の ${index + 1} 件目に name または url がありません。`,
          );
        }

        return { name, url };
      });
    }

    return validated;
  } catch (error) {
    console.error("リンク集データの読み込みに失敗しました:", error);
    return {};
  }
};

export default async function LinksPage() {
  const linksData = await loadLinksData();
  const categories = Object.entries(linksData);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Title subTitle="LINKS" title="リンク集" />

      {categories.length === 0 ? (
        <p className="text-sm text-gray-600">
          リンク集を読み込めませんでした。しばらくしてから再度お試しください。
        </p>
      ) : (
        <div className="space-y-10">
          {categories.map(([categoryKey, links]) => (
            <section key={categoryKey}>
              <h2 className="mb-4 border-b pb-2 text-2xl font-semibold">
                {formatCategoryName(categoryKey)}
              </h2>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={`${categoryKey}-${link.url}`}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}