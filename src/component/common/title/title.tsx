// /src/component/common/title/title.tsx

type TitleProps = {
  title: string;
};

const Title = ({title}:TitleProps) => {
  return (
    <>
      <div className="">{title}</div>
    </>
  );
};

export default Title;