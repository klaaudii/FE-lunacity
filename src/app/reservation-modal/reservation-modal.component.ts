import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Screening} from "../screening";
import {Film} from "../film";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AuditoriumsService} from "../auditoriums.service";
import {BehaviorSubject, catchError, combineLatest, EMPTY, map, Observable, of} from "rxjs";
import {Auditorium} from "../auditorium";
import {TicketsService} from "../tickets.service";
import {Ticket} from "../ticket";
import {CountdownReservationService} from "../countdown-reservation.service";
import {Time} from "@angular/common";
import Utils, {TicketType} from "../utils";
import {ScreeningsService} from "../screenings.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReservationsService} from "../reservations.service";
import {Reservation} from "../reservation";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss']
})
export class ReservationModalComponent implements OnInit{
  @Input() film! : Film;
  @Input() screening!: Screening;
  @Input() tickets!: Array<Ticket>;

  activatedTab = 0;

  nAdultTickets = new BehaviorSubject<number>(0);
  nChildTickets = new BehaviorSubject<number>(0);
  nSeniorTickets = new BehaviorSubject<number>(0);

  nTickets = new BehaviorSubject<number>(0);

  selectedTickets =  new Set<Ticket>();

  remainingTime: number | undefined;


  showConfirmation = false;

  showSeatsAreTaken = false;

  showReservationWasCanceled = false;


  form: FormGroup;
  constructor(private activeModal: NgbActiveModal,
              private ticketsService: TicketsService,

              private s: ScreeningsService,
              private fb: FormBuilder,
              private countdownReservationService: CountdownReservationService,
              private reservationsService: ReservationsService) {

    combineLatest([this.nAdultTickets, this.nChildTickets, this.nSeniorTickets])
      .pipe(
        map(([value1, value2, value3]) => value1 + value2 + value3)
      )
      .subscribe(sum => {
        this.nTickets.next(sum);
      });

    this.countdownReservationService.remainingTime$.subscribe((time) => {
      this.remainingTime = time;
      if (time == 0) {
         this.showReservationWasCanceled = true;
      }
    });

    this.countdownReservationService.reservationStatus$.subscribe((status) => {
      this.showSeatsAreTaken = status;
    });

    this.form = fb.group({
      firstName: [undefined, [Validators.required]],
      lastName: [undefined, [Validators.required]],
      email: [undefined, [Validators.required, Validators.email]],
      phoneNumber: [undefined, [Validators.required, Validators.pattern("^[0-9]*$"),
        Validators.minLength(10), Validators.maxLength(10)]],
    })


  }


  getAuditoriumRowsCount(){
    let max = 0;
    this.tickets.forEach(value => {if (value.seat.y > max) max = value.seat.y})
    return max;
  }

  close() {
    this.selectedTickets = new Set<Ticket>();
    this.activeModal.dismiss();
  }


  changeNumAdults(count:string){
    this.nAdultTickets.next(Number(count));
  }

  changeNumChildren(count:string){
    this.nChildTickets.next(Number(count));
  }

  changeNumSeniors(count:string){
    this.nSeniorTickets.next(Number(count));
  }

  increaseTabIndex(){
    this.activatedTab++;
    console.log(this.showSeatsAreTaken)
    console.log(this.showConfirmation)
    console.log(this.showReservationWasCanceled)

  }

  giveNewChanceToMakeReservation(){
    this.decreaseTabIndex();
    this.showReservationWasCanceled = false;
  }

  decreaseTabIndex(){
    this.activatedTab--;
  }


  onClickSeat(ticket : Ticket){
    if (ticket.state == 1) return
    if (this.selectedTickets.has(ticket)) {
      this.selectedTickets.delete(ticket);
    } else {
      if (this.selectedTickets.size == this.nTickets.value) {
        this.selectedTickets = new Set<Ticket>();
        this.selectedTickets.add(ticket);
        return
      }
      this.selectedTickets.add(ticket);
    }
  }

  formatTime(seconds: number): string {
    return Utils.formatTime(seconds);
  }


  cancelReservation(){
    this.decreaseTabIndex()
    this.countdownReservationService.cancelReservation();
  }

  makeReservation(){
    this.increaseTabIndex()
    let ticketsTypes = this.getTicketTypesArray();
    let index = 0;
    this.selectedTickets.forEach(value => {
      value.type = ticketsTypes.at(index)!;
    index++})
    this.countdownReservationService.makeReservation(this.selectedTickets);
  }

  getTicketTypesArray() : Array<number>{
    let array = [];

      for (let i = 0; i < this.nAdultTickets.value; i++) {
        array.push(TicketType.Adult);
      }
      for (let i = 0; i < this.nChildTickets.value; i++) {
        array.push(TicketType.Child);
      }
      for (let i = 0; i < this.nSeniorTickets.value; i++) {
        array.push(TicketType.Senior);
      }
      return array;
  }


  isInvalid(field: string) {
    return this.form.controls[field].touched && this.form.controls[field].invalid;
  }

  confirmReservation(){
    if (this.form.invalid) {
      return;
    }

    const reservation = new HttpParams()
      .set('email', this.form.value.email)
      .set('firstName', this.form.value.firstName)
      .set('lastName', this.form.value.lastName)
      .set('phoneNumber', this.form.value.phone);




    // let reservation: Reservation = {
    //   id: undefined,
    //   email: this.form.value.email, firstName: this.form.value.firstName,
    //   lastName: this.form.value.lastName, phoneNumber: this.form.value.phone,
    //   created: new Date(), tickets: []
    // }
     this.countdownReservationService.createReservation(this.form.value, this.selectedTickets);

    this.countdownReservationService.deleteCounter();
    this.showConfirmation = true;
  }

  ngOnInit(): void {
    console.log("oninit")
    this.showConfirmation = false;

    this.showSeatsAreTaken = false;

    this.showReservationWasCanceled = false;
  }




}

