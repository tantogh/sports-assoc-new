// /src/component/common/top/sponsorship/sponsorship.tsx

import { notoSerifJP } from "@/component/utils/fonts/fonts";

const Sponsorship = () => {
  return (
    <>
      <div className={`text-xs xl:text-xl font-bold p-4 ${notoSerifJP.className}`}>
        サントリービバレッジサービス株式会社　様<br />
        株式会社　ゴールドウィン　様
      </div>
    </>
  );
};

export default Sponsorship;