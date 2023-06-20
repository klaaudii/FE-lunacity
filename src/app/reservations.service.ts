import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ScreeningGroup} from "./screening-group";
import {Screening} from "./screening";
import {Ticket} from "./ticket";
import {Reservation} from "./reservation";


@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) {
  }

  newReservation(reservation: Reservation) {
    console.log(reservation)
    return this.http.post('/v1/reservations/', reservation);
  }

  getReservations(){
    return this.http.get('/v1/reservations');
  }
}
