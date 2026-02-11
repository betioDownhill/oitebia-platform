export type Work = {
  slug: string;
  title: string;
  sense: string;
  tagline: string;
  synopsis: string;
  novelSlug: string;
  highlight: string;
  thumbnail: string;
};

export type NovelChapter = {
  id: string;
  heading: string;
  body: string;
};

export type Novel = {
  slug: string;
  workTitle: string;
  sense: string;
  teaser: string;
  thumbnail: string;
  lead: string;
  chapters: NovelChapter[];
  fetchError?: string;
};

export type StudioMember = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  catchphrase: string;
  thumbnail: string;
};

export type StudioMetric = {
  label: string;
  value: string;
};

export type StudioData = {
  members: StudioMember[];
  metrics: StudioMetric[];
  activity: string[];
  fetchError?: string;
};
