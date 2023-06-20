import {Seat} from "./seat";

export interface Auditorium {
  id : number;
  name: string;

  seats: Set<Seat>;
}
