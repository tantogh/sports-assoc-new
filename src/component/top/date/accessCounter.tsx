// src/_components/header/accessCounter.tsx

import Image from "next/image";

const AccessCounter = () => {
  return (
    <div className="w-10 h-auto sm:w-20 sm:h-auto md:w-24 md:h-auto lg:w-28 lg:h-auto mx-auto my-2">
      <Image
        src="https://www.f-counter.net/j/33/1596164025/"
        alt="アクセスカウンター"
        width={84}
        height={12}
        priority={true}
        className="w-full h-full"
       />
    </div>
  );
};

export default AccessCounter;