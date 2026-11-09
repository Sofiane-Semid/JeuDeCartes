import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-parties',
  standalone: true,
  imports: [],
  templateUrl: './parties.component.html',
  styleUrl: './parties.component.css'
})
export class PartiesComponent {
  matches: any[] = []
  constructor(
    private matchService: MatchService,
    private router: Router
  ) { }
currentUserId = sessionStorage.getItem("UserId")
currentUserName = sessionStorage.getItem("Username")

  ngOnInit() {
    this.matchService
      .getActiveMatches()
      .subscribe(data => {

        this.matches = data

      })
  }

  watchMatch(matchId: number) {
    this.router.navigate(
      ['/match', matchId],
      {
        queryParams: {
          spectator: true
        }
      }
    )
  }
}
