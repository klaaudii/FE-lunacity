import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FilmDetailComponent} from "./film-detail/film-detail.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: 'films/:id', component: FilmDetailComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
