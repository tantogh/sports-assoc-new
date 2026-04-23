// src/component/common/title/title.tsx

import { notoSerifJP } from "@/component/utils/fonts/fonts";

type TitleProps = {
  subTitle: string;
  title: string;
};

export default function Title({ subTitle, title }: TitleProps) {
  return (
    <>
      <div className={`text-center ${notoSerifJP.className}`}>
        <p className="text-xxs lg:text-xxs font-semibold uppercase tracking-[0.2em] text-sky-600">
          {subTitle}
        </p>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-900">
          {title}
        </h1>
      </div>
    </>
  );
};
