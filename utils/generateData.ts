// utils/generateData.ts
import { videos } from "@/constants/videos";
import { IVideo } from "@/interfaces/video";

let idCounter = videos.length + 1;

export const generateData = (count: number): IVideo[] => {
  const generatedData: IVideo[] = [];

  for (let i = 0; i < count; i++) {
    const baseVideo = videos[i % videos.length];
    generatedData.push({
      ...baseVideo,
      id: `${idCounter++}`,
    });
  }

  return generatedData;
};
