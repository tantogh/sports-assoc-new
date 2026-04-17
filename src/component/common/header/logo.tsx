// src/component/common/header/logo.tsx

import Image from 'next/image';

export default function Logo() {
  return (
    <div className="pr-2 w-10 h-auto sm:w-12 sm:h-auto md:w-14 md:h-auto lg:w-16 lg:h-auto">
      <Image
        src="/images/icon/logo.png"
        alt="石川県障害者スポーツ協会のロゴ"
        width={32}
        height={32}
        className="w-full h-full"
    />
    </div>
  );
};
