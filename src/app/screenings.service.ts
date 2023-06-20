import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ScreeningGroup} from "./screening-group";
import {Screening} from "./screening";
import {Ticket} from "./ticket";


@Injectable({
  providedIn: 'root'
})
export class ScreeningsService {

  constructor(private http: HttpClient) {
  }

  getScreeningsByDateAndGenre(date : string, genre: number | undefined) {
    let url = `/v1/screenings?date=${date}`
    if (genre != undefined && genre > 0) url += `&genre=${genre}`
    return this.http.get<ScreeningGroup[]>(url);
  }

  getScreeningsInWeek(id: number) {
     return this.http.get<Array<Array<Screening>>>(`/v1/screenings/week/${id}`);
  }

  editTicket(ticket : Ticket) {
    console.log("editujem")
    return this.http.get<Array<Array<Screening>>>(`/v1/screnings/week/${ticket.id}`).subscribe();
    //
  }





}
