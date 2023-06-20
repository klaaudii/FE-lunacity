import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LocalStorageModule} from "angular-2-local-storage";
import {
  NgbAlertModule,
  NgbCarouselModule, NgbDatepickerModule,
  NgbModalModule,
  NgbNav, NgbNavItem, NgbNavLink,
  NgbPaginationModule,
  NgbTypeaheadModule
} from "@ng-bootstrap/ng-bootstrap";
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { HomeComponent } from './home/home.component';
import { ProgramItemComponent } from './program-item/program-item.component';
import { ProgramComponent } from './program/program.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgFor} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import { FilmIntroComponent } from './film-intro/film-intro.component';
import {SafePipe} from "./safe.pipe";
import { ReservationModalComponent } from './reservation-modal/reservation-modal.component';
import { RegistrationTabsComponent } from './registration-tabs/registration-tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmDetailComponent,
    HomeComponent,
    ProgramItemComponent,
    ProgramComponent,
    FilmIntroComponent,
    SafePipe,
    ReservationModalComponent,
    RegistrationTabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LocalStorageModule.forRoot(
      {
        prefix: 'lunacity',
        storageType: 'localStorage'
      }
    ),
    NgbPaginationModule,
    NgbModalModule,
    NgbTypeaheadModule,
    NgbNav,
    NgbNavItem,
    NgbNavLink,
    NgbCarouselModule,
    NgbDatepickerModule,
    NgbAlertModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgFor,
    MatInputModule,

  ],
  providers: [
    //{provide: LOCALE_ID, useValue: 'sk'},
    // {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
