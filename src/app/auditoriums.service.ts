import {HttpClient} from "@angular/common/http";
import {Film} from "./film";
import {Auditorium} from "./auditorium";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class AuditoriumsService {

  constructor(private http: HttpClient) {
  }

  getAuditorium(id: number) {
    return this.http.get<Auditorium>(`/auditorium/${id}`);
  }
}
