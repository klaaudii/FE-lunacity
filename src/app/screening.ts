import {Time} from "@angular/common";
import {Auditorium} from "./auditorium";
import {Ticket} from "./ticket";

export interface Screening {
  id : number;
  date: Date;

  time: Time;

  price: number;

  tickets: Array<Ticket>

  auditorium: Auditorium;
}
