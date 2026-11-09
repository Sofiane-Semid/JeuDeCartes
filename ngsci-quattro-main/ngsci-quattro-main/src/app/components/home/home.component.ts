import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { MatButtonModule } from '@angular/material/button';
import { SignalRService } from 'src/app/signal-r.service';
import { stateStart } from 'mermaid/dist/rendering-util/rendering-elements/shapes/stateStart';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [MatButtonModule, RouterOutlet, CommonModule, MatSnackBarModule]
})
export class HomeComponent implements OnInit {

 
  isOpen = false;
  constructor(public router: Router, public match: MatchService, private snackBar: MatSnackBar,  private apiService: ApiService,public signalRservice:SignalRService) { }

  ngOnInit() {
    this.signalRservice.connecttohub()
    
  }

  versMesCartes(){
    this.router.navigate(['home/cards']);
  }

  versMagasin(){
    this.router.navigate(['home/store']);
  }

  versDecks(){
    this.router.navigate(['home/deck']);
  }
  
  versStats(){
    this.router.navigate(['home/stats']);
  }
  

  async joinMatch(user1: boolean) {   
    // TODO: Anuglar: Afficher un dialogue qui montre que l'on attend de joindre un match
    // TODO: Hub: Se connecter au Hub et joindre un match
    await this.router.navigate(['/home']); //naviguer vers l'écran d'accueil avant d'afficher le dialogue
    await new Promise(resolve => setTimeout(resolve, 50));
    this.isOpen = true;
    localStorage.removeItem("MatchId")
    
    this.signalRservice.joinMatch(localStorage.getItem("username")!,() => {
      

      
      if(localStorage.getItem("MatchId")!=null)
      {
        let matchId=localStorage.getItem("MatchId")
        this.router.navigate(['/match/' + matchId]);
      }
    })
    
    
    
  }
  async testToken() {
  try {
    const data = await this.apiService.getPrivateData();
    this.snackBar.open(data.join(", "), "OK", { duration: 3000 });
  } catch {
    this.snackBar.open("Token invalide", "Erreur", { duration: 3000 });
  }
  
}


  


  




}