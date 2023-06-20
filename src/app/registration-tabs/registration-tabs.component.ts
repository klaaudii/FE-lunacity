import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-registration-tabs',
  templateUrl: './registration-tabs.component.html',
  styleUrls: ['./registration-tabs.component.scss']
})
export class RegistrationTabsComponent {
  @Input() activatedTab = 0;
   tabs: string[]=["VOĽBA LÍSTKA", "VÝBER SEDADLA", "REZERVÁCIA"];

}
