import {Component, Input} from '@angular/core';
import {Film} from "../film";

@Component({
  selector: 'app-film-intro',
  templateUrl: './film-intro.component.html',
  styleUrls: ['./film-intro.component.scss']
})
export class FilmIntroComponent {
  @Input() film!:Film
}
