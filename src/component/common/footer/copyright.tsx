// src/component/common/footer/copyright.tsx

import { notoSerifJP } from "@/component/utils/fonts/fonts";

const years = "2026";

const Copyright = () => {
  return (
    <>
      <small className={`text-center text-xs text-gray-600 bg-sky-100/80 ${notoSerifJP.className}`}>
        Copyright &copy; {years} 石川県パラスポーツ協会 All Rights Reserved.
      </small>
    </>
  );
};

export default Copyright;