import {Injectable} from '@angular/core';
import {Ticket} from "./ticket";
import {BehaviorSubject, EMPTY, forkJoin, map, Subject} from "rxjs";
import {TicketsService} from "./tickets.service";
import {TicketState, TicketType} from "./utils";
import {Reservation} from "./reservation";
import {ReservationsService} from "./reservations.service";
import {HttpParams} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CountdownReservationService {

  private remainingTimeSubject: Subject<number> = new Subject<number>();
  remainingTime$ = this.remainingTimeSubject.asObservable();
  private countdownTimer: any;
  private countdownTimerHelper: any;

  data : Set<Ticket> = new Set<Ticket>();

  private reservationTime = 1000 * 20// * 10;

  private reservationStatusSubject = new BehaviorSubject<boolean>(false);
  reservationStatus$ = this.reservationStatusSubject.asObservable();

  setReservationStatus(status: boolean) {
    this.reservationStatusSubject.next(status);
  }

  constructor(private ticketsService: TicketsService,
              private reservationsService: ReservationsService) {
  }

  startCountdownEvent(data: Set<Ticket>){
    this.data = data;
    this.resetCountdown();
    this.updateRemainingTime(this.reservationTime);
    this.countdownTimer = setTimeout(() => {
      this.releaseReservedSeats();
    }, this.reservationTime);
  }

  private updateRemainingTime(remainingTime: number): void {
    this.remainingTimeSubject.next(Math.floor(remainingTime / 1000));

    if (remainingTime > 0) {
      this.countdownTimerHelper = setTimeout(() => {
        this.updateRemainingTime(remainingTime - 1000);
      }, 1000);
    }
  }

  deleteCounter(){
    clearTimeout(this.countdownTimer);
    clearTimeout(this.countdownTimerHelper);
  }

  cancelReservation(){
    this.deleteCounter()
    this.releaseReservedSeats();
  }

  createReservation(reservation: Reservation, tickets: Set<Ticket>){
    reservation.created = new Date();
     this.reservationsService.newReservation(reservation).subscribe(
      (createdReservation ) => {
         console.log(createdReservation);

        tickets.forEach((ticket) => {
          console.log(ticket.type)
          ticket.reservation = createdReservation as Reservation; // Assign the reservation ID to each ticket
          this.ticketsService.editTicketWithRes(ticket).subscribe();
        });

      },
      (error) => {
       }
       )
  }


  private resetCountdown(): void {
     this.remainingTimeSubject.next(-1);
  }

  private releaseReservedSeats(): void {
    this.data.forEach(value => {
      value.state = TicketState.Free;
      value.type = TicketType.Adult;
      this.ticketsService.editTicket(value).subscribe();
    })
  }

  makeReservation(tickets: Set<Ticket>) {
    this.startCountdownEvent(tickets)
    this.reserveSeats(tickets)
  }

  private reserveSeats(tickets: Set<Ticket>) {
    const reservations = Array.from(tickets).map((ticket) => {
      ticket.state = TicketState.Reserved;
      return this.ticketsService.editTicket(ticket).subscribe(
        (response) => response,
        (error) => {
          console.log('Reservation failed:', error);
          this.cancelReservation();
          this.setReservationStatus(true);
          return EMPTY;
        });
    });

    forkJoin(reservations).subscribe(
      () => {
        this.setReservationStatus(false);
        },
      (error) => {}
    );
  }


}
