import { Component } from '@angular/core';
import {Film} from "../film";
import {FilmsService} from "../films.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  films$: Observable<Film[]>;
  date = new Date().toLocaleDateString('en-CA');
  constructor(private filmsService: FilmsService, private router: Router) {
    this.films$ = filmsService.getFilms()
    this.router.navigate(['home'], { queryParams: { date: this.date } });
  }


}
