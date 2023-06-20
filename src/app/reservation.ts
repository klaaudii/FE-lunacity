import {Ticket} from "./ticket";

export interface Reservation {
  id? : number;
  created : Date;

  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  tickets: Array<Ticket>

}
