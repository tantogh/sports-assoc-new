// src/app/clubs/introduction/page.tsx
import { Metadata } from "next";
import Title from "@/component/common/title/title";
import clubs from '../../../../content/clubs/clubs.json';

export const metadata: Metadata = {
  title: "クラブ紹介 | クラブ情報 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のクラブ紹介のページです。",
};

export default function Introduction() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
        <Title subTitle="CLUBS" title="クラブ紹介" />

        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 px-4 py-2">クラブ名</th>
              <th className="border border-gray-300 px-4 py-2">ホームページ</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50 hover:bg-blue-100/50" : "bg-white hover:bg-blue-100/50"}>
                <td className="border border-gray-300 px-4 py-2">
                  {club.link ? (
                    <a href={club.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {club.name}
                    </a>
                  ) : (
                    club.name
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {club.homepage && club.homepage.url ? (
                    <a href={club.homepage.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {club.homepage.type || "HP"}
                    </a>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
