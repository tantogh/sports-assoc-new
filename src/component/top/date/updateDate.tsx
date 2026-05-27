// src/_components/top-page/update-date.tsx

import AccessCounter from "@/component/top/date/accessCounter";

const DateComponent = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return (
    <div className="flex justify-center items-center gap-4 md:gap-8">
      <div className="text-center md:text-2xl font-bold text-stone-600">
        <p>{year}年{month}月{day}日<span className="text-red-600">更新</span></p>
      </div>
      <div>
        <AccessCounter />
      </div>
    </div>
  );
};

export default DateComponent;