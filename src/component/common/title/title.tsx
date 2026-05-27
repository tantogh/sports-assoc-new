// src/component/common/title/title.tsx

type TitleProps = {
  subTitle: string;
  title: string;
};

export default function Title({ subTitle, title }: TitleProps) {
  // 小文字化した subTitle を id に利用
  const id = subTitle.toLowerCase();

  return (
    <>
      <div className="text-center p-4">
        <p id={id} className="scroll-mt-16 text-xxs lg:text-xxs font-semibold uppercase tracking-[0.2em] text-sky-600">
          {subTitle}
        </p>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-900">
          {title}
        </h1>
      </div>
    </>
  );
};