// src/component/common/title/title.tsx

import { notoSerifJP } from "@/component/utils/fonts/fonts";

type TitleProps = {
  subTitle: string;
  title: string;
};

const Title = ({ subTitle, title }: TitleProps) => {
  return (
    <>
      <div className={`mt-2 text-center ${notoSerifJP.className}`}>
        <p className="mb-1 text-xs lg:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          {subTitle}
        </p>
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900 md:text-5xl">
          {title}
        </h1>
      </div>
    </>
  );
};

export default Title;