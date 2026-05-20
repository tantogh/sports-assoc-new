// src/component/common/top/sponsorship/sponsorship.tsx

import { notoSerifJP } from "@/component/utils/fonts/fonts";

export default function Sponsorship() {
  return (
    <>
      <section className="w-full max-w-2xl mx-auto mb-4 p-2 bg-white rounded-xl shadow-lg">
        <p className={`text-xs xl:text-xl font-bold p-4 text-center ${notoSerifJP.className}`}>
          サントリービバレッジサービス株式会社様<br />
          株式会社　ゴールドウィン様
        </p>
      </section>
    </>
  );
};
