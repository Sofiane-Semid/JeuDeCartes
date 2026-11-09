import { Injectable, OnInit } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { Match, MatchData } from './models/models';
import { MatchService } from './services/match.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { HttpClient } from '@angular/common/http';
import { EventDebuggerComponent } from './components/event-debugger/event-debugger.component';
import { EventDebuggerService } from './services/event-debugger.service';
@Injectable({
  providedIn: 'root'
})
export class SignalRService implements OnInit {
  private hubConnection?: signalR.HubConnection
  
  UserId: string=""
  connectionId:string=""
  matchData: MatchData|null=null
  matchStartEvent: any =null
  connected: boolean=false
  joinCallback: (() => void) | undefined;

  constructor(private matchService: MatchService, public http: HttpClient) {

  }
  async ngOnInit() {
    this.connecttohub()
  }

   async connecttohub(){
    var token =sessionStorage.getItem("token")!
  
    this.connected=false
    this.hubConnection= new signalR.HubConnectionBuilder().withUrl("http://localhost:5276/MatchHub",{accessTokenFactory:()=>token}).build();
    
    this.hubConnection.on('UserInfo',(data)=>{
      this.connectionId=data
      console.log('connectionId: '+this.connectionId)
    })

    this.hubConnection.on('UserId',(data)=>{
      this.UserId=data
      console.log('userId: '+this.UserId)
    })

    this.hubConnection.on('JoinMatch',(data)=>{
      this.matchData=data
     console.log(this.matchData?.match)
     if(this.matchData?.match!=null){
        
        localStorage.setItem("MatchId",this.matchData.match.id.toString())
        this.matchService.match=this.matchData.match
        this.matchService.matchData=this.matchData
        this.matchService.match.playerDataA.battleField.sort((a,b)=>(
          a.index-b.index
        ));
        this.matchService.match.playerDataB.battleField.sort((a,b)=>(
          a.index-b.index
        ));
        this.matchService.playMatch(this.matchData,parseInt(sessionStorage.getItem("playerId")!))
        if(this.joinCallback)
          this.joinCallback();    
     }

          
      
    });

    

    this.hubConnection.on('ApplyEvent',(data)=>{
      
      if(!data){
        console.warn("Event null reçu, ignoré");
        return;
      }
      
      console.log(data)
      this.matchService.applyEvent(data)
      
    })
    
   await this.hubConnection.start().then(()=>{console.log('connexion établie')}).catch(err=>console.log('Error while starting connection: '+ err))

    this.connected=true
  }

  async joinMatch(userId:string, operation: ()=>void, matchId?:number){

    this.joinCallback = operation;
    this.UserId = userId;

    while (!this.connected) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    if(localStorage.getItem("MatchId")==null)
      await this.hubConnection!.invoke('JoinMatch', userId, null)
    else
      await this.hubConnection!.invoke('JoinMatch', userId, parseInt(localStorage.getItem("MatchId")!))
  }

  startMatch(userId:string,match:Match){
    this.hubConnection!.invoke('StartMatch',userId,match)
  }

  endTurn(userId:string,matchId:number){
    this.hubConnection!.invoke('EndTurn',userId,matchId)
  }

  surrender(userId:string,matchId:number){
      this.hubConnection!.invoke('Surrender',userId,matchId)
  }

  cardEvent(userId:string,match:Match,cardId:number,actualCardId:number){
    this.hubConnection!.invoke('CardEvent',match,cardId,actualCardId)
  }
}
