
import { Component, OnInit, signal } from '@angular/core';
import { MatchData, PlayerData } from '../models/models';
import { MatchService } from './../services/match.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HealthComponent } from './health/health.component';
import { MatButtonModule } from '@angular/material/button';
import { PlayerhandComponent } from './playerhand/playerhand.component';
import { EnemyhandComponent } from './enemyhand/enemyhand.component';
import { BattlefieldComponent } from './battlefield/battlefield.component';
import { EventDebuggerService } from '../services/event-debugger.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignalRService } from '../signal-r.service';
import { retry } from 'rxjs';
import { card } from 'mermaid/dist/rendering-util/rendering-elements/shapes/card';


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
  standalone: true,
  imports: [BattlefieldComponent, EnemyhandComponent, PlayerhandComponent, MatButtonModule, HealthComponent, CommonModule, FormsModule]
})
export class MatchComponent implements OnInit {
  

  constructor(private eventDebuggerService: EventDebuggerService, private route: ActivatedRoute, public router: Router, public matchService: MatchService, public apiService: ApiService, public signalRService: SignalRService) { }


  async ngOnInit() {
    let matchId: number = parseInt(this.route.snapshot.params["id"]);
    await this.signalRService.connecttohub()

    // TODO Tâche Hub: Se connecter au Hub et obtenir le matchData
    
    let matchData=null
    if(this.signalRService.matchData!=null&&sessionStorage.getItem("playerId")!=null){
      matchData=this.signalRService.matchData
      
      this.matchService.playMatch(matchData,parseInt(sessionStorage.getItem("playerId")!))
      console.log(matchData)
    }
    else{
       
        
      await this.signalRService.joinMatch(sessionStorage.getItem("UserId")!,()=>{},parseInt(localStorage.getItem("MatchId")!))
       //matchData=this.signalRService.matchData
     // this.matchService.playMatch(matchData!,parseInt(sessionStorage.getItem("PlayerId")!))
    }
    
    
    
    
    
    // Test: À retirer une fois que le Hub est fonctionnel
    
    // TODO déplacer vers le tâche hub pour pouvoir débugger les événements reçus du serveur
    
  }

async playCard(cardId:number,actualCardId:number){
  
  await this.signalRService.cardEvent(sessionStorage.getItem("UserId")!,this.matchService.match!,cardId,actualCardId)
  
}  

  async endTurn() {
    // TODO Tâche Hub: Faire l'action sur le Hub et retirer fakeEndTurn
    await this.signalRService.endTurn(sessionStorage.getItem("UserId")!,this.matchService.match!.id)
    //this.matchService.applyEvent(endturn)
    //this.fakeEndTurn();
  }

  // Pour permettre de tester le visuel du gameplay avant d'avoir fait la logique sur le serveur
  

  async surrender() {
    // TODO Tâche Hub: Faire l'action sur le Hub et retirer fakeSurrender
    
    
    let surrender= await this.signalRService.surrender(sessionStorage.getItem("UserId")!,this.matchService.match?.id!)
    this.matchService.applyEvent(surrender)
    
    //this.fakeSurrender();
  }

  // Pour permettre de tester le visuel du gameplay avant d'avoir fait la logique sur le serveur
  
  endMatch() {
    //renvoyer au home
    this.router.navigate(['/home']);

  }

  isVictory() {
    if (this.matchService.matchData?.winningPlayerId)
      return this.matchService.matchData!.winningPlayerId === this.matchService.playerData!.playerId
    return false;
  }

  isMatchCompleted() {
    return this.matchService.matchData?.match.isMatchCompleted;
  }
}
