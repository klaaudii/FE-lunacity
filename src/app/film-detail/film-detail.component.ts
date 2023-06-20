import {Component, EventEmitter, Output} from '@angular/core';
import {FilmsService} from "../films.service";
import {Observable, switchMap} from "rxjs";
import {Film} from "../film";
import {ActivatedRoute} from "@angular/router";
import Utils from "../utils";
import {Screening} from "../screening";
import {ScreeningsService} from "../screenings.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ReservationModalComponent} from "../reservation-modal/reservation-modal.component";
import {Ticket} from "../ticket";
import {CountdownReservationService} from "../countdown-reservation.service";
import {TicketsService} from "../tickets.service";

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent {
  week: { name: string, date: string }[] = [];
  film$: Observable<Film>;

  weekScreenings$: Observable<Array<Array<Screening>>>;
  constructor(private filmsService: FilmsService,
              private screeningsService: ScreeningsService,
              private ticketsService: TicketsService,
              private countdownReservation: CountdownReservationService,
              private route: ActivatedRoute,
              private modal: NgbModal) {
    this.film$ = route.paramMap
      .pipe(switchMap(params => filmsService.getFilm(Number(params.get('id')))));
    this.week = Utils.getWeekDays();
    this.weekScreenings$ = route.paramMap
      .pipe(switchMap(params => screeningsService.getScreeningsInWeek(Number(params.get('id')))));

  }
  openReservationModal(screening: Screening, film: Film){
    this.ticketsService.getTicketsByScreeningId(film.id).subscribe(value => {
      console.log(value)
      const modalRef = this.modal.open(ReservationModalComponent, { windowClass : "myCustomModalClass"});
      modalRef.componentInstance.film = film;
      modalRef.componentInstance.screening = screening;
      modalRef.componentInstance.tickets = value;

      modalRef.result.then(value => {
        console.log(value)
        this.countdownReservation.cancelReservation()
      }, reason => {
        console.log(reason)
        this.countdownReservation.cancelReservation()
      })

      })


  }
}
