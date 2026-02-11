import type { NovelSource } from "../data/novelSources";

const OWNER = "betioDownhill";
const REPO = "oitebia-studio";
const BRANCH = "master";
const TOKEN = process.env.OITEBIA_STUDIO_READ_TOKEN;

export type NovelChapter = {
  id: string;
  heading: string;
  body: string;
};

export type LoadedNovel = {
  slug: string;
  workTitle: string;
  lead: string;
  sourceUrl: string;
  chapters: NovelChapter[];
  fetchError?: string;
};

function toApiUrl(path: string): string {
  return `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`;
}

function stripFrontmatter(input: string): string {
  if (!input.startsWith("---")) {
    return input;
  }

  const end = input.indexOf("\n---", 3);
  if (end === -1) {
    return input;
  }

  return input.slice(end + 4).trimStart();
}

function parseChapters(markdown: string): NovelChapter[] {
  const cleaned = stripFrontmatter(markdown).trim();
  if (!cleaned) {
    return [{ id: "chapter-1", heading: "本文", body: "本文データが空です。" }];
  }

  const lines = cleaned.split("\n");
  const chapters: NovelChapter[] = [];
  let currentHeading = "本文";
  let currentBody: string[] = [];
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

  return chapters.length > 0
    ? chapters
    : [{ id: "chapter-1", heading: "本文", body: cleaned }];
}

export async function loadNovel(source: NovelSource): Promise<LoadedNovel> {
  const sourceUrl = `https://github.com/${OWNER}/${REPO}/blob/${BRANCH}/${source.path}`;
  const apiUrl = toApiUrl(source.path);

  try {
    const response = await fetch(apiUrl, {
      headers: TOKEN
        ? {
            Authorization: `Bearer ${TOKEN}`,
            Accept: "application/vnd.github+json"
          }
        : {
            Accept: "application/vnd.github+json"
          }
    });

    if (!response.ok) {
      if (!TOKEN) {
        return {
          slug: source.slug,
          workTitle: source.workTitle,
          lead: "privateリポジトリ取得にはトークン設定が必要です。",
          sourceUrl,
          chapters: [
            {
              id: "chapter-1",
              heading: "取得エラー",
              body: "OITEBIA_STUDIO_READ_TOKEN が未設定のため本文を取得できませんでした。"
            }
          ],
          fetchError: `${response.status} ${response.statusText}`
        };
      }

      return {
        slug: source.slug,
        workTitle: source.workTitle,
        lead: "oitebia-studio の本文取得に失敗しました。",
        sourceUrl,
        chapters: [{ id: "chapter-1", heading: "取得エラー", body: "本文を取得できませんでした。" }],
        fetchError: `${response.status} ${response.statusText}`
      };
    }

    const payload = (await response.json()) as { content?: string; encoding?: string };
    const encoded = payload.content?.replace(/\n/g, "");

    if (!encoded || payload.encoding !== "base64") {
      return {
        slug: source.slug,
        workTitle: source.workTitle,
        lead: "oitebia-studio の本文取得に失敗しました。",
        sourceUrl,
        chapters: [{ id: "chapter-1", heading: "取得エラー", body: "本文データ形式が不正です。" }],
        fetchError: "Invalid content payload"
      };
    }

    const markdown = Buffer.from(encoded, "base64").toString("utf-8");
    return {
      slug: source.slug,
      workTitle: source.workTitle,
      lead: "oitebia-studio の小説本文を参照しています。",
      sourceUrl,
      chapters: parseChapters(markdown)
    };
  } catch (error) {
    return {
      slug: source.slug,
      workTitle: source.workTitle,
      lead: "oitebia-studio への通信に失敗したため、本文を取得できませんでした。",
      sourceUrl,
      chapters: [{ id: "chapter-1", heading: "通信エラー", body: "本文取得時に通信エラーが発生しました。" }],
      fetchError: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
