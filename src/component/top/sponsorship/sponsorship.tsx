// src/component/common/top/sponsorship/sponsorship.tsx

import { notoSerifJP } from "@/component/utils/fonts/fonts";

export default function Sponsorship() {
  return (
    <>
      <section className="w-full py-2">
        <div className="rounded-xl bg-white p-4 md:p-6">
          <p className={`text-xs xl:text-xl font-bold p-4 ${notoSerifJP.className}`}>
            サントリービバレッジサービス株式会社　様<br />
            株式会社　ゴールドウィン　様
          </p>
        </div>
      </section>
    </>
  );
};
