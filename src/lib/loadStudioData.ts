import { fetchPrivateRepoMarkdown } from "./githubRepoContent";

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

const fallbackMembers: StudioMember[] = [
  {
    id: "oite",
    name: "Oite",
    role: "統括・小説",
    specialty: "原作執筆、方向性決定",
    catchphrase: "今日は勝ちにいく。積み上げるだけ。",
    thumbnail: "/images/members/oite.svg"
  },
  {
    id: "melody",
    name: "Melody",
    role: "音楽",
    specialty: "BGM、効果音、音響設計",
    catchphrase: "物語が聞こえる。",
    thumbnail: "/images/members/melody.svg"
  },
  {
    id: "visu",
    name: "Visu",
    role: "映像",
    specialty: "絵コンテ、アニメーション",
    catchphrase: "見たことのない映像を作る。",
    thumbnail: "/images/members/visu.svg"
  },
  {
    id: "aria",
    name: "Aria",
    role: "デザイン",
    specialty: "キャラデザ、背景、ブランド",
    catchphrase: "美しいものには理由がある。",
    thumbnail: "/images/members/aria.svg"
  },
  {
    id: "betty",
    name: "Betty",
    role: "品質監査",
    specialty: "矛盾検出、構造監査",
    catchphrase: "完璧は細部に宿る。",
    thumbnail: "/images/members/betty.svg"
  }
];

const fallbackMetrics: StudioMetric[] = [
  { label: "作品数", value: "5作品（五感シリーズ）" },
  { label: "総文字数", value: "約40,890文字" },
  { label: "ストーリーボード", value: "157カット" },
  { label: "楽曲計画", value: "16曲" }
];

const fallbackActivity = [
  "小説本文の整備と公開導線の設計",
  "ビジュアル・音楽・映像の制作統合フロー整備",
  "短編アニメーション公開に向けた連携作業"
];

function parseTableRows(md: string, marker: string): string[][] {
  const lines = md.split("\n");
  const markerIndex = lines.findIndex((line) => line.includes(marker));
  if (markerIndex === -1) {
    return [];
  }

  const rows: string[][] = [];
  for (let i = markerIndex + 2; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line.startsWith("|")) {
      break;
    }

    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.replace(/\*\*/g, "").trim());

    if (cells.length > 0) {
      rows.push(cells);
    }
  }

  return rows;
}

function toMemberThumb(name: string): string {
  const id = name.toLowerCase();
  return `/images/members/${id}.svg`;
}

const roleByName: Record<string, string> = {
  Oite: "統括・小説",
  Melody: "音楽",
  Visu: "映像",
  Aria: "デザイン",
  Betty: "品質監査"
};

export async function loadStudioData(): Promise<StudioData> {
  const result = await fetchPrivateRepoMarkdown("README.md");
  if (!result.ok || !result.content) {
    return {
      members: fallbackMembers,
      metrics: fallbackMetrics,
      activity: fallbackActivity,
      fetchError: result.error
    };
  }

  const memberRows = parseTableRows(result.content, "| Role | Member | Specialty | Catchphrase |");
  const metricRows = parseTableRows(result.content, "| 指標 | 数値 |");

  const members: StudioMember[] =
    memberRows.length > 0
      ? memberRows
          .filter((row) => row.length >= 4)
          .map((row) => {
            const name = row[1];
            return {
              id: name.toLowerCase(),
              name,
              role: roleByName[name] ?? row[2],
              specialty: row[2],
              catchphrase: row[3],
              thumbnail: toMemberThumb(name)
            };
          })
      : fallbackMembers;

  const metrics: StudioMetric[] =
    metricRows.length > 0
      ? metricRows
          .filter((row) => row.length >= 2)
          .map((row) => ({ label: row[0], value: row[1] }))
      : fallbackMetrics;

  return {
    members,
    metrics,
    activity: fallbackActivity
  };
}
