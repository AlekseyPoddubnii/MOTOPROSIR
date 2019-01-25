import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// import { AuthenticationService } from './shared/services/authentication.service';
import { User } from './shared/models/user.model';
import { UserService } from './shared/services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'motoprostir';

}
