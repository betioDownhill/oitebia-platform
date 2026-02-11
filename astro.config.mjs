import { defineConfig } from "astro/config";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  site: "https://betiodownhill.github.io",
  base: isGithubActions && repo ? `/${repo}/` : "/",
  output: "static"
});
