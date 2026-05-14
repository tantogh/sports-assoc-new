// src/app/links/page.tsx
import { Metadata } from "next";
import fs from "node:fs/promises";
import path from "path";

import { notoSerifJP } from "@/component/utils/fonts/fonts";
import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "リンク集 | 石川県パラスポーツ協会",
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
  national_organizations: "全国の団体",
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
    alert("リンク集データの読み込みに失敗しました。\n" + (error instanceof Error ? error.message : String(error)));
    return {};
  }
};

export default async function LinksPage() {
  const linksData = await loadLinksData();
  const categories = Object.entries(linksData);

  return (
    <>
      <div className="max-w-7xl mx-auto px-2 lg:px-4">
        <Title subTitle="LINKS" title="リンク集" />
        <section className={`max-w-2xl mx-auto p-6 bg-white ${notoSerifJP.className}`}>
          {categories.length === 0 ? (
            <p className="text-sm text-gray-600">
              リンク集を読み込めませんでした。しばらくしてから再度お試しください。
            </p>
          ) : (
            <div className="space-y-10">
              {categories.map(([categoryKey, links]) => (
                <section key={categoryKey}>
                  <h2 className="mb-4 border-b pb-2 pl-2 text-2xl font-semibold border-l-8 border-sky-600">
                    {formatCategoryName(categoryKey)}
                  </h2>
                  <ul className="space-y-3 list-disc list-inside">
                    {links.map((link) => (
                      <li key={`${categoryKey}-${link.url}`}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs lg:text-base text-blue-600 hover:text-blue-800 hover:underline"
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
        </section>
      </div>
    </>
  );
}