import fs from "node:fs/promises";
import path from "node:path";

const OWNER = "betioDownhill";
const REPO = "oitebia-studio";
const BRANCH = "master";
const TOKEN = process.env.OITEBIA_STUDIO_READ_TOKEN;

const projectMeta = {
  "yui-miracle": {
    slug: "yui-miracle",
    workTitle: "AIアニメーター・ユイの小さな奇跡",
    sense: "視覚",
    teaser: "描いたイラストが3分だけ現実になる。",
    thumbnail: "/images/sample.png"
  },
  "last-tuner": {
    slug: "last-tuner",
    workTitle: "最後の調律師",
    sense: "聴覚",
    teaser: "ピアノに刻まれた記憶が聴こえる。",
    thumbnail: "/images/sample.png"
  },
  work3: {
    slug: "kintsugi-touch",
    workTitle: "継ぎの痕",
    sense: "触覚",
    teaser: "壊れた器に触れると、感情が流れ込む。",
    thumbnail: "/images/sample.png"
  },
  work4: {
    slug: "residual-scent",
    workTitle: "残り香",
    sense: "嗅覚",
    teaser: "人の記憶を香りとして嗅ぎ取る。",
    thumbnail: "/images/sample.png"
  },
  work5: {
    slug: "taste-blind",
    workTitle: "味知らず",
    sense: "味覚",
    teaser: "感情を味として感じ取る食堂の物語。",
    thumbnail: "/images/sample.png"
  }
};

const fallbackOrder = ["yui-miracle", "last-tuner", "work3", "work4", "work5"];

const fallbackMembers = [
  {
    id: "oite",
    name: "Oite",
    role: "統括・小説",
    specialty: "原作執筆、方向性決定",
    catchphrase: "今日は勝ちにいく。積み上げるだけ。",
    thumbnail: "/images/sample.png"
  },
  {
    id: "melody",
    name: "Melody",
    role: "音楽",
    specialty: "BGM、効果音、音響設計",
    catchphrase: "物語が聞こえる。",
    thumbnail: "/images/sample.png"
  },
  {
    id: "visu",
    name: "Visu",
    role: "映像",
    specialty: "絵コンテ、アニメーション",
    catchphrase: "見たことのない映像を作る。",
    thumbnail: "/images/sample.png"
  },
  {
    id: "aria",
    name: "Aria",
    role: "デザイン",
    specialty: "キャラデザ、背景、ブランド",
    catchphrase: "美しいものには理由がある。",
    thumbnail: "/images/sample.png"
  },
  {
    id: "betty",
    name: "Betty",
    role: "品質監査",
    specialty: "矛盾検出、構造監査",
    catchphrase: "完璧は細部に宿る。",
    thumbnail: "/images/sample.png"
  }
];

const fallbackMetrics = [
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

function apiUrl(filePath) {
  return `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}?ref=${BRANCH}`;
}

async function fetchRepoJson(filePath) {
  const res = await fetch(apiUrl(filePath), {
    headers: TOKEN
      ? {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/vnd.github+json"
        }
      : {
          Accept: "application/vnd.github+json"
        }
  });

  if (!res.ok) {
    throw new Error(`${filePath}: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

async function fetchRepoText(filePath) {
  const payload = await fetchRepoJson(filePath);
  const encoded = payload.content?.replace(/\n/g, "");
  if (!encoded || payload.encoding !== "base64") {
    throw new Error(`${filePath}: invalid content payload`);
  }
  return Buffer.from(encoded, "base64").toString("utf-8");
}

function fallbackNovelSources() {
  return fallbackOrder
    .map((project) => {
      const meta = projectMeta[project];
      if (!meta) {
        return null;
      }
      return {
        ...meta,
        path: `projects/${project}/story/final/ep01.md`
      };
    })
    .filter(Boolean);
}

function normalizeProjectMeta(projectName) {
  const known = projectMeta[projectName];
  if (known) {
    return known;
  }

  return {
    slug: projectName,
    workTitle: projectName,
    sense: "未設定",
    teaser: "制作中の作品です。",
    thumbnail: "/images/sample.png"
  };
}

async function discoverNovelSources() {
  if (!TOKEN) {
    return fallbackNovelSources();
  }

  try {
    const projectEntries = await fetchRepoJson("projects");
    const projectDirs = projectEntries
      .filter((entry) => entry.type === "dir")
      .map((entry) => entry.name);

    const sources = [];

    for (const projectName of projectDirs) {
      try {
        const finalEntries = await fetchRepoJson(`projects/${projectName}/story/final`);
        const mdFiles = finalEntries.filter((entry) => entry.type === "file" && entry.name.endsWith(".md"));
        if (mdFiles.length === 0) {
          continue;
        }

        const preferred =
          mdFiles.find((entry) => /(final|oitebia)/i.test(entry.name)) ??
          mdFiles.find((entry) => /ep03/i.test(entry.name)) ??
          mdFiles[0];

        const meta = normalizeProjectMeta(projectName);
        sources.push({
          ...meta,
          path: preferred.path
        });
      } catch {
        // If one project is missing story/final, skip it.
      }
    }

    const order = Object.keys(projectMeta);
    sources.sort((a, b) => {
      const ai = order.findIndex((name) => projectMeta[name].slug === a.slug);
      const bi = order.findIndex((name) => projectMeta[name].slug === b.slug);
      if (ai === -1 && bi === -1) {
        return a.slug.localeCompare(b.slug);
      }
      if (ai === -1) {
        return 1;
      }
      if (bi === -1) {
        return -1;
      }
      return ai - bi;
    });

    return sources.length > 0 ? sources : fallbackNovelSources();
  } catch {
    return fallbackNovelSources();
  }
}

function stripFrontmatter(input) {
  if (!input.startsWith("---")) {
    return input;
  }
  const end = input.indexOf("\n---", 3);
  if (end === -1) {
    return input;
  }
  return input.slice(end + 4).trimStart();
}

function parseChapters(markdown) {
  const cleaned = stripFrontmatter(markdown).trim();
  if (!cleaned) {
    return [{ id: "chapter-1", heading: "本文", body: "本文データが空です。" }];
  }

  const lines = cleaned.split("\n");
  const chapters = [];
  let currentHeading = "本文";
  let currentBody = [];
  let chapterCount = 0;

  for (const line of lines) {
    const headingMatch = line.match(/^##+\s+(.+)/);
    if (headingMatch) {
      if (currentBody.length > 0) {
        chapterCount += 1;
        chapters.push({
          id: `chapter-${chapterCount}`,
          heading: currentHeading,
          body: currentBody.join("\n").trim()
        });
      }
      currentHeading = headingMatch[1].trim();
      currentBody = [];
      continue;
    }
    currentBody.push(line);
  }

  if (currentBody.length > 0) {
    chapterCount += 1;
    chapters.push({
      id: `chapter-${chapterCount}`,
      heading: currentHeading,
      body: currentBody.join("\n").trim()
    });
  }

  return chapters.length > 0 ? chapters : [{ id: "chapter-1", heading: "本文", body: cleaned }];
}

function parseTableRows(md, marker) {
  const lines = md.split("\n");
  const markerIndex = lines.findIndex((line) => line.includes(marker));
  if (markerIndex === -1) {
    return [];
  }

  const rows = [];
  for (let i = markerIndex + 2; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line.startsWith("|")) {
      break;
    }
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.replace(/\*\*/g, "").trim());
    rows.push(cells);
  }
  return rows;
}

function toMemberThumb() {
  return "/images/sample.png";
}

function fallbackNovels(sources, error) {
  return sources.map(({ slug, workTitle, sense, teaser, thumbnail }) => ({
    slug,
    workTitle,
    sense,
    teaser,
    thumbnail,
    lead: "作品本文の取得に失敗しました。",
    fetchError: error,
    chapters: [{ id: "chapter-1", heading: "取得エラー", body: "本文を取得できませんでした。" }]
  }));
}

async function main() {
  const generatedDir = path.resolve("src/generated");
  await fs.mkdir(generatedDir, { recursive: true });

  const discoveredSources = await discoverNovelSources();

  let novels;
  let studio;

  if (!TOKEN) {
    novels = fallbackNovels(discoveredSources, "OITEBIA_STUDIO_READ_TOKEN が未設定です");
    studio = {
      members: fallbackMembers,
      metrics: fallbackMetrics,
      activity: fallbackActivity,
      fetchError: "OITEBIA_STUDIO_READ_TOKEN が未設定です"
    };
  } else {
    try {
      const [readme, ...novelTexts] = await Promise.all([
        fetchRepoText("README.md"),
        ...discoveredSources.map((novel) => fetchRepoText(novel.path))
      ]);

      novels = discoveredSources.map(({ slug, workTitle, sense, teaser, thumbnail }, idx) => ({
        slug,
        workTitle,
        sense,
        teaser,
        thumbnail,
        lead: "本文はスタジオ原本から同期しています。",
        chapters: parseChapters(novelTexts[idx])
      }));

      const memberRows = parseTableRows(readme, "| Role | Member | Specialty | Catchphrase |");
      const metricRows = parseTableRows(readme, "| 指標 | 数値 |");
      const roleByName = {
        Oite: "統括・小説",
        Melody: "音楽",
        Visu: "映像",
        Aria: "デザイン",
        Betty: "品質監査"
      };

      const members =
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

      const metrics =
        metricRows.length > 0
          ? metricRows.filter((row) => row.length >= 2).map((row) => ({ label: row[0], value: row[1] }))
          : fallbackMetrics;

      studio = {
        members,
        metrics,
        activity: fallbackActivity
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      novels = fallbackNovels(discoveredSources, message);
      studio = {
        members: fallbackMembers,
        metrics: fallbackMetrics,
        activity: fallbackActivity,
        fetchError: message
      };
    }
  }

  await fs.writeFile(path.join(generatedDir, "novels.json"), JSON.stringify(novels, null, 2));
  await fs.writeFile(path.join(generatedDir, "studio.json"), JSON.stringify(studio, null, 2));
  console.log("synced studio data");
}

main();
