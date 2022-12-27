import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-crm';

  constructor(
    public utils: UtilsService,
    public authService: AuthService
  ) {

  }
}
