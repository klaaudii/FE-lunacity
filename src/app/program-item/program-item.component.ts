import {Component, Input} from '@angular/core';
import {ScreeningGroup} from "../screening-group";

@Component({
  selector: 'app-program-item',
  templateUrl: './program-item.component.html',
  styleUrls: ['./program-item.component.scss']
})
export class ProgramItemComponent {
  @Input() screeningGroup!: ScreeningGroup


}
