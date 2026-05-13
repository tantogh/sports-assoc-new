// src/component/common/top/sponsorship/sponsorship.tsx

import { notoSerifJP } from "@/component/utils/fonts/fonts";

export default function Sponsorship() {
  return (
    <>
      <section className="w-full">
        <p className={`text-xs xl:text-xl font-bold p-4 text-center ${notoSerifJP.className}`}>
          サントリービバレッジサービス株式会社　様<br />
          株式会社　ゴールドウィン　様
        </p>
      </section>
    </>
  );
};
