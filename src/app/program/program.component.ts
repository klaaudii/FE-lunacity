import {Component, OnDestroy} from '@angular/core';
import {ScreeningsService} from "../screenings.service";
import {ScreeningGroup} from "../screening-group";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Subscription, switchMap} from "rxjs";

import {Genre} from "../genre";
import Utils from "../utils";


@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],

})
export class ProgramComponent implements OnDestroy{

  selectedItemIndex = 0;
  screeningsGroups: ScreeningGroup[] = [];
  screeningsGenres = new Array<Genre>();
  date: string = new Date().toLocaleDateString('en-CA');

  dateChange: boolean = false;
  genre: number | undefined;
  week: { name: string, date: string }[] = [];

  private subscription: Subscription;
  private refreshSubject = new BehaviorSubject(undefined);

  constructor(private screeningsService: ScreeningsService, private route: ActivatedRoute){
    this.subscription = this.refreshSubject
      .pipe(switchMap(() => {
        if (!this.date.includes("-")) this.date = new Date().toLocaleDateString('en-CA');
        return screeningsService.getScreeningsByDateAndGenre(this.date, this.genre)
      }))
      .subscribe(value => {
        if (this.screeningsGroups != value) {
          this.screeningsGroups = value
          this.screeningsGroups.forEach(value => {value.film.genres= Array.from(value.film.genres)
            .sort((a, b) => a.name.localeCompare(b.name));
            value.screenings = value.screenings.sort((a, b) => {
              if (a.time < b.time) return -1;
              if (a.time > b.time) return 1;
              return 0;
            } )
          })
          if (this.dateChange) {
            this.getGenresOfScreenings()
            this.dateChange = false;
          }
        }
      });

    this.route.queryParamMap.subscribe((params) => {
      this.date = params.get('date') || (Date.now().toString());
      this.dateChange = true;
      this.refresh();
    });
    this.week = Utils.getWeekDays();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getGenresOfScreenings(){
    let screeningsGenres = new Set<Genre>();
    for(let i=0; i < this.screeningsGroups.length; i++){
      for(let j=0; j < this.screeningsGroups.at(i)!.film.genres.length; j++){
        screeningsGenres.add(this.screeningsGroups.at(i)!.film.genres.at(j)!)
      }
    }
    this.screeningsGenres = Array.from(screeningsGenres).sort((a, b) => a.name.localeCompare(b.name) );
  }
  refresh() {
    this.refreshSubject.next(undefined);
  }

  selectItem(index: number): void {
    this.selectedItemIndex = index;
  }


}
