import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Film} from "./film";


@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) {
  }

  getFilm(id: number) {
    return this.http.get<Film>(`/v1/films/${id}`);
  }

  getFilms() {
    return this.http.get<Film[]>(`/v1/films`);
  }


}
