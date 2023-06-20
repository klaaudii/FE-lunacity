import {Language} from "./language";
import {Subtitles} from "./subtitles";
import {Rating} from "./rating";
import {Genre} from "./genre";

export interface Film {
  id : number;
  title: string;
  description: string;
  releaseYear: number;
  length: number;
  language: Language;
  subtitles: Subtitles;
  rating: Rating;
  genres: Array<Genre>;

  imagePath: string;

  bgImagePath: string;

  youtubePath: string;
}
