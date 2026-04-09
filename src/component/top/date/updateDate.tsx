// src/component/top/date/updateDate.tsx

import { notoSerifJP } from "@/component/utils/fonts/fonts";

const DateComponent = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return (
    <div className={`p-4 text-center md:text-2xl font-bold text-stone-600 ${notoSerifJP.className}`}>
      <p>県内外の新着情報を {year}年{month}月{day}日<span className="text-red-600">&nbsp;更新</span></p>
    </div>
  );
};

export default DateComponent;