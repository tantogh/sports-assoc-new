export type CategoryMetadata = {
  title: string;
  subTitle: string;
  description: string;
};

export const categoryMetadata: Record<string, CategoryMetadata> = {
  information: {
    title: "新着情報",
    subTitle: "INFORMATION",
    description: "石川県パラスポーツ協会の新着情報ページです。",
  },
  newsletters: {
    title: "協会だより",
    subTitle: "NEWSLETTERS",
    description: "石川県パラスポーツ協会の会報ページです。",
  },
  clubs: {
    title: "クラブ報告",
    subTitle: "REPORTS",
    description: "石川県パラスポーツ協会のクラブ報告ページです。",
  },
};
