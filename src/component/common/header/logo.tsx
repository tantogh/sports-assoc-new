// /src/component/common/header/logo.tsx

import Image from 'next/image';

const Logo = () => {
  return (
    <div className="pr-2 w-16 h-auto sm:w-24 sm:h-auto md:w-24 md:h-auto lg:w-24 lg:h-auto">
      <Image
        src="/images/icon/logo.png"
        alt="石川県障害者スポーツ協会のロゴ"
        width={24}
        height={24}
        className="w-full h-full"
    />
    </div>
  );
};

export default Logo;