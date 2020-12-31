import {Component, Input} from '@angular/core';
import {UserServiceService} from '../../services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() welcome: any;
  constructor() {
   this.welcome = 'Hi! ' + this.welcome;
  }
}


