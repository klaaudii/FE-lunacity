import {Film} from "./film";
import {Screening} from "./screening";

export interface ScreeningGroup {
  film: Film
  screenings: Screening[];
}
