import { Component } from '@angular/core';
import {CountdownReservationService} from "./countdown-reservation.service";
import {Ticket} from "./ticket";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lunacity';
  constructor() {
  }

  ngOnInit(){
    const navEl = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navEl!.classList.add('navbar-scrolled');
      } else if (window.scrollY < 101) {
        navEl!.classList.remove('navbar-scrolled');
      }
    })
  }



}
