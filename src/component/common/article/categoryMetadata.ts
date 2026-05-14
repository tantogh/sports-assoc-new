export type CategoryMetadata = {
  title: string;
  subTitle: string;
  description: string;
  url: string;
};

export const categoryMetadata: Record<string, CategoryMetadata> = {
  information: {
    title: "新着情報",
    subTitle: "INFORMATION",
    description: "石川県パラスポーツ協会の新着情報ページです。",
    url: "/",
  },
  special: {
    title: "特別記事",
    subTitle: "SPECIAL",
    description: "石川県パラスポーツ協会の特別記事ページです。",
    url: "/", 
  },
  newsletters: {
    title: "協会だより",
    subTitle: "NEWSLETTERS",
    description: "石川県パラスポーツ協会の会報ページです。",
    url: "/about/newsletters",     
  },
  clubs: {
    title: "クラブ報告",
    subTitle: "REPORTS",
    description: "石川県パラスポーツ協会のクラブ報告ページです。",
    url: "/clubs/reports",
  },
  ishikawa: {
    title: "石川県障害者スポーツ大会",
    subTitle: "TOURNAMENTS",
    description: "石川県パラスポーツ協会の県内大会ページです。",
    url: "/tournaments/ishikawa",
  },
  national: {
    title: "全国障害者スポーツ大会",
    subTitle: "TOURNAMENTS",
    description: "石川県パラスポーツ協会の全国大会ページです。",
    url: "/tournaments/national",
  },
  results: {
    title: "大会結果",
    subTitle: "RESULTS",
    description: "石川県パラスポーツ協会の大会結果ページです。",
    url: "/events/results",
  },
  reports: {
    title: "事業報告",
    subTitle: "REPORTS",
    description: "石川県パラスポーツ協会の事業報告ページです。",
    url: "/events/reports",
  },
  staff: {
    title: "パラスポーツ指導員募集",
    subTitle: "STAFF",
    description: "石川県パラスポーツ協会の指導員募集ページです。",
    url: "/events/staff",
  },
  activity: {
    title: "パラスポーツ指導員活動報告",
    subTitle: "ACTIVITY",
    description: "石川県パラスポーツ協会指導員の活動報告ページです。",
    url: "/instructor/activity",
  },
};
