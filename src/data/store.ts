import { works } from "./works";
import novelsRaw from "../generated/novels.json";
import studioRaw from "../generated/studio.json";
import type { Novel, StudioData, Work } from "../types";

export const workList = works as Work[];
export const novelList = novelsRaw as Novel[];
export const studioData = studioRaw as StudioData;

export function findWork(slug: string): Work | undefined {
  return workList.find((work) => work.slug === slug);
}

export function findNovel(slug: string): Novel | undefined {
  return novelList.find((novel) => novel.slug === slug);
}
