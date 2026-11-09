import { Component } from '@angular/core';
import { MatchService } from './services/match.service';
import { Router, RouterOutlet, RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatChipsModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
  ],
})
export class AppComponent {
  title = 'supercartesinfinies';
  
  constructor(public router: Router, public matchService: MatchService) { }

  isLogged(): boolean {
    return sessionStorage.getItem("token") != null;
  }

  getUsername() {
    return sessionStorage.getItem("username");
  }

  async logout() {
   sessionStorage.clear()
    this.router.navigate(['/login']);
  }
   
  get coins(): number {
      return Number(sessionStorage.getItem("coins")) || 0;
  }

  get elo(): number {
  return Number(sessionStorage.getItem("elo")) || 1000;
}
  

}
