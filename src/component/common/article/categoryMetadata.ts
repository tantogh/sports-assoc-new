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
  ishikawa: {
    title: "県内大会",
    subTitle: "TOURNAMENTS",
    description: "石川県パラスポーツ協会の県内大会ページです。",
  },
  national: {
    title: "全国大会",
    subTitle: "TOURNAMENTS",
    description: "石川県パラスポーツ協会の全国大会ページです。",
  },
  results: {
    title: "大会結果",
    subTitle: "RESULTS",
    description: "石川県パラスポーツ協会の大会結果ページです。",
  },
  staff: {
    title: "スタッフ募集",
    subTitle: "STAFF",
    description: "石川県パラスポーツ協会のスタッフ募集ページです。",
  },
  reports: {
    title: "事業報告",
    subTitle: "REPORTS",
    description: "石川県パラスポーツ協会の事業報告ページです。",
  },
  instructors: {
    title: "活動報告",
    subTitle: "REPORTS",
    description: "石川県パラスポーツ協会の活動報告ページです。",
  },
};
