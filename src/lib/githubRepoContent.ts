const OWNER = "betioDownhill";
const REPO = "oitebia-studio";
const BRANCH = "master";
const TOKEN = process.env.OITEBIA_STUDIO_READ_TOKEN;

function toApiUrl(path: string): string {
  return `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`;
}

export type RepoContentResult = {
  ok: boolean;
  content?: string;
  error?: string;
};

export async function fetchPrivateRepoMarkdown(path: string): Promise<RepoContentResult> {
  const apiUrl = toApiUrl(path);

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
      return {
        ok: false,
        error: TOKEN
          ? `${response.status} ${response.statusText}`
          : "OITEBIA_STUDIO_READ_TOKEN が未設定です"
      };
    }

    const payload = (await response.json()) as { content?: string; encoding?: string };
    const encoded = payload.content?.replace(/\n/g, "");

    if (!encoded || payload.encoding !== "base64") {
      return { ok: false, error: "Invalid content payload" };
    }

    return {
      ok: true,
      content: Buffer.from(encoded, "base64").toString("utf-8")
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
