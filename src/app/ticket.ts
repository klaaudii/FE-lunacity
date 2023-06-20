import {Seat} from "./seat";
import {Reservation} from "./reservation";

export interface Ticket {
  id : number;
  seat: Seat

  type: number;

  state: number;

  version: number;

  reservation: Reservation;
}
