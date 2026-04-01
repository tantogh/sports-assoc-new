// /src/component/common/header/logo.tsx

import Image from 'next/image';

const Logo = () => {
  return (
    <div className="pr-2 w-14 h-auto sm:w-16 sm:h-auto md:w-18 md:h-auto lg:w-18 lg:h-auto">
      <Image
        src="/images/icon/logo.png"
        alt="石川県障害者スポーツ協会のロゴ"
        width={20}
        height={20}
        className="w-full h-full"
    />
    </div>
  );
};

export default Logo;