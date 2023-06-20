import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Ticket} from "./ticket";
import {catchError, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) {
  }

  getTicketsByScreeningId(id: number) {
    return this.http.get<Array<Ticket>>(`/v1/tickets/screening/${id}`);
  }

  editTicket(ticket : Ticket) {
    return this.http.put<Ticket>(`/v1/tickets/${ticket.id}`, ticket).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
         return throwError('Something went wrong');
      }));
  }

  editTicketWithRes(ticket : Ticket) {
    return this.http.put<Ticket>(`/v1/tickets/${ticket.id}/res`, ticket).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong');
      }));
  }


}
