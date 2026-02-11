import type { NovelSource } from "../data/novelSources";
import { fetchPrivateRepoMarkdown } from "./githubRepoContent";

export type NovelChapter = {
  id: string;
  heading: string;
  body: string;
};

export type LoadedNovel = {
  slug: string;
  workTitle: string;
  lead: string;
  chapters: NovelChapter[];
  fetchError?: string;
};

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
  const result = await fetchPrivateRepoMarkdown(source.path);

  if (!result.ok || !result.content) {
    return {
      slug: source.slug,
      workTitle: source.workTitle,
      lead: "作品本文の取得に失敗しました。",
      chapters: [{ id: "chapter-1", heading: "取得エラー", body: "本文を取得できませんでした。" }],
      fetchError: result.error
    };
  }

  return {
    slug: source.slug,
    workTitle: source.workTitle,
    lead: "本文はスタジオ原本から同期しています。",
    chapters: parseChapters(result.content)
  };
}
