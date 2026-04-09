// /src/component/common/title/title.tsx

import { notoSerifJP } from "@/component/utils/fonts/fonts";

type TitleProps = {
  title: string;
};

const Title = ({title}: TitleProps) => {
  return (
    <>
      <div className={`text-2xl font-bold p-2 ml-2 mt-4 border-l-8 border-sky-600 ${notoSerifJP.className}`}>{title}</div>
    </>
  );
};

export default Title;