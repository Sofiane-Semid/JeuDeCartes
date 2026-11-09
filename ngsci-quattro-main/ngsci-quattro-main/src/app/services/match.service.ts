import { Card, MatchData, MatchEvent, PlayableCard } from 'src/app/models/models';
import { PlayerData } from '../models/models';
import { Component, Injectable } from '@angular/core';
import { Match } from '../models/models';

import { SignalRService } from '../signal-r.service';
import { lastValueFrom, timeout, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  match: Match | null = null;
  matchData: MatchData | null = null;
  currentPlayerId: number = -1;

  playerData: PlayerData | undefined;
  adversaryData: PlayerData | undefined;

  opponentSurrendered: boolean = false;
  isCurrentPlayerTurn: boolean = false;
  endMatchResult: {
    isWinner: boolean;
    coins: number;
    eloChange: number;
    newElo: number;
  } | null = null;

  
constructor(private http: HttpClient)
{
}
  clearMatch() {
    this.match = null;
    this.matchData = null;
    this.playerData = undefined;
    this.adversaryData = undefined;
    this.opponentSurrendered = false;
    this.isCurrentPlayerTurn = false;
  }



  playMatch(matchData: MatchData, currentPlayerId: number, isSpectator: boolean = false) {
    if(isSpectator){
  this.matchData = matchData;
  this.match = matchData.match;

  this.playerData = this.match.playerDataA!;
  this.playerData.playerName = matchData.playerA.name;

  this.adversaryData = this.match.playerDataB!;
  this.adversaryData.playerName = matchData.playerB.name;

  return;
}
    this.matchData = matchData;
    this.match = matchData.match;
    this.currentPlayerId = currentPlayerId;

    if (this.match.playerDataA.playerId == this.currentPlayerId) {
      this.playerData = this.match.playerDataA!;
      this.playerData.playerName = matchData.playerA.name;
      this.adversaryData = this.match.playerDataB!;
      this.adversaryData.playerName = matchData.playerB.name;
      this.isCurrentPlayerTurn = this.match.isPlayerATurn;
    }
    else {
      this.playerData = this.match.playerDataB!;
      this.playerData.playerName = matchData.playerB.name;
      this.adversaryData = this.match.playerDataA!;
      this.adversaryData.playerName = matchData.playerA.name;
      this.isCurrentPlayerTurn = !this.match.isPlayerATurn;
    }
    this.playerData.maxhealth = 20;
    this.adversaryData.maxhealth = 20;
    console.log(this.playerData)
    console.log(this.adversaryData)
  }

  // La méthode qui passe à travers l'arbre d'évènements reçu par le serveur
  // Utiliser pour mettre les données à jour et jouer les animations
  async applyEvent(event: any) {

    if (!event) {
      console.warn("applyEvent appelé avec undefined");
      return;
    }

    console.log("ApplyingEvent: " + event.eventType);
    console.log(event)

    switch (event.eventType) {
      case "StartMatch": {
        await new Promise(resolve => setTimeout(resolve, 1000));
        break;
      }

      case "GainMana": {
        // TODO
        let playerData = this.getPlayerData(event.playerId);
        if (playerData) {
          playerData.mana += event.mana
        }

        if (playerData?.playerId == this.currentPlayerId) {
          localStorage.setItem("yourMana", playerData.mana.toString())
        }
        else {
          localStorage.setItem("opponentMana", playerData!.mana.toString())
        }
        break;
      }

      case "PlayerEndTurn": {
        if (this.match) {
          this.match.isPlayerATurn = !this.match.isPlayerATurn;
          this.isCurrentPlayerTurn = event.playerId != this.currentPlayerId;
        }

        break;
      }
      case "DrawCard": {
        let playerData = this.getPlayerData(event.playerId);
        if (playerData) {
          this.moveCard(playerData.cardsPile, playerData.hand, event.playableCardId);
          await new Promise(resolve => setTimeout(resolve, 250));
          playerData.battleField.sort((a, b) => (
            a.index - b.index
          ));
          playerData.hand.sort((a, b) => (
            a.index - b.index
          ));
        }

        break;
      }
      case "EndMatch": {
        this.matchData!.winningPlayerId = event.winningPlayerId;
        this.match!.isMatchCompleted = true;
        const isWinner = event.winningPlayerId === this.currentPlayerId;

        const coinsGained = isWinner
          ? event.moneyReceivedByWinner
          : event.moneyReceivedByLoser;

        const eloChange = isWinner
          ? event.winnerEloChange
          : event.loserEloChange;

        const newElo = isWinner
          ? event.winnerNewElo
          : event.loserNewElo;

        this.endMatchResult = {
          isWinner: isWinner,
          coins: coinsGained,
          eloChange: eloChange,
          newElo: newElo
        };
        sessionStorage.setItem("elo", newElo.toString());

        const currentCoins = Number(sessionStorage.getItem("coins")) || 0;
        sessionStorage.setItem("coins", (currentCoins + coinsGained).toString());

        console.log("EVENT END MATCH:", event);
        break;
      }
      case "PlayCard": {
        console.log("PlayCard en train d'appliquer")
        let playerData = this.getPlayerData(event.playerId)
        if (playerData && event.playableCardId != null) {
          this.moveCard(playerData.hand, playerData.battleField, event.playableCardId)
          console.log(playerData.battleField)
          await new Promise(resolve => setTimeout(resolve, 1000))
          console.log(playerData.mana)
          console.log(event.prixMana)
          playerData.mana = playerData.mana - parseInt(event.prixMana)

          playerData.hand.sort((a, b) => (
            a.index - b.index
          ));
          console.log(playerData.mana)
        }
        break;
      }
      case "CardActivation": {

        let playerData = this.getPlayerData(event.playerId)
        if (playerData) {
          for (let c of playerData.battleField) {
            if (c.id == event.playableCardId) {
              c.animate = true
              console.log(c.animate)
              await lastValueFrom(timer(1000))
              c.animate = false
              console.log(c.animate)
            }
          }


        }
        break;
      }
      case "Thorns": {

        let playerData = this.getPlayerData(event.playerId)
        if (playerData) {
          for (let c of playerData.battleField) {
            if (c.id == event.playableCardId) {
              c.powerClass = "fas fa-road-spikes"
              console.log(c.animate)
              await lastValueFrom(timer(1000))
              c.powerClass = null

            }
          }


        }
        break;
      }
      case "HealthThief": {

        let playerData = this.getPlayerData(event.playerId)
        if (playerData) {
          for (let c of playerData.battleField) {
            if (c.id == event.playableCardId) {
              c.powerClass = "fas fa-droplet"
              console.log(c.animate)
              await lastValueFrom(timer(1000))
              c.powerClass = null
              c.health = c.health + event.value
              if (c.health > c.card.health) {
                c.health = c.card.health
              }
              console.log(c.animate)
            }
          }
         
        
      }
      break;
      
    }
    case "Chaos":{

          let playerData=this.getPlayerData(event.playerId)
          if(playerData){
            for(let c of playerData.battleField){
              if(c.id==event.playableCardId){
                c.powerClass="fas fa-arrow-right-arrow-left"
                console.log(c.animate)
                await lastValueFrom(timer(1000))
                c.powerClass=null
                c.health=event.newHealth
                c.card.attack=event.newAttack
                
                console.log(c.animate)
              }
          }
         
        
      }
      break;
    }
    case "Poison":{

          let playerData=this.getPlayerData(event.playerId)
          if(playerData){
            for(let c of playerData.battleField){
              if(c.id==event.playableCardId){
                c.powerClass="fas fa-skull-crossbones"
                console.log(c.animate)
                await lastValueFrom(timer(1000))
                c.powerClass=null
                c.health=c.health+event.value
                if(c.health>c.card.health){
                  c.health=c.card.health
                }
                console.log(c.animate)
              }
          }
         
        
      }
      break;
    }
    case "Stun":{

          let playerData=this.getPlayerData(event.playerId)
          if(playerData){
            for(let c of playerData.battleField){
              if(c.id==event.playableCardId){
                c.powerClass="fas fa-sun"
                console.log(c.animate)
                await lastValueFrom(timer(1000))
                c.powerClass=null
                
                
                console.log(c.animate)
              }
          }
         
        
      }
      break;
    }
    case "FirstStrike":{

        let playerData = this.getPlayerData(event.playerId)
        if (playerData) {
          for (let c of playerData.battleField) {
            if (c.id == event.playableCardId) {
              c.powerClass = "fas fa-arrows-to-circle"
              console.log(c.animate)
              await lastValueFrom(timer(1000))
              c.powerClass = null

            }
          }


        }
        break;
      }
      case "Heal": {

        let playerData = this.getPlayerData(event.playerId)
        if (playerData) {
          for (let c of playerData.battleField) {
            c.health = c.health + parseInt(event.healing)
            if (c.health > c.card.health) {
              c.health = c.card.health
            }
            console.log(c.health)
            if (c.id == event.playableCardId) {
              c.powerClass = "fas fa-cross"
              await lastValueFrom(timer(1000))

              c.powerClass = null

            }
          }


        }
        break;
      }

      case "CardDeath": {

        let playerData = this.getPlayerData(event.playerId)
        if (playerData) {

          this.moveCard(playerData.battleField, playerData.graveyard, event.playableCardId)
          await new Promise(resolve => setTimeout(resolve, 250));
          playerData.battleField.sort((a, b) => (
            a.index - b.index
          ));
          playerData.hand.sort((a, b) => (
            a.index - b.index
          ));
        }
        break;
      }

      case "PlayerDamage": {
        let playerData = this.getPlayerData(event.playerId)
        if (playerData) {
          playerData.health = playerData.health - parseInt(event.damage)
        }
        break;
      }

      case "CardDamage": {
        var index = 0
        console.log(event.playableCardId)
        let playerData = this.getPlayerData(event.playerId)
        if (playerData) {
          for (let a of playerData.battleField) {
            if (a.id == event.playableCardId) {
              console.log(a.id)
              a.health = a.health - parseInt(event.damage)

            }

          }
        }
      }
    }
    if (event.events) {
      for (let e of event.events) {
        await this.applyEvent(e);
      }
    }
  }

  // Obtenir le PlayerData d'un match à partir de l'Id du Player
  getPlayerData(playerId: any): PlayerData | null {

    if (this.match) {
      if (playerId == this.match.playerDataA.playerId)
        return this.match.playerDataA;
      else if (playerId == this.match.playerDataB.playerId)
        return this.match.playerDataB;
    }
    return null;
  }

  // Déplace une carte d'un array à l'autre
  moveCard(src: PlayableCard[], dst: PlayableCard[], playableCardId: any) {
    let playableCard = src.find(c => c.id == playableCardId);

    if (playableCard != undefined) {
      let index = src.findIndex(c => c.id == playableCardId);
      // Retire l'élément de l'array
      src.splice(index, 1);
      dst.push(playableCard);
    }
  }
  getActiveMatches()
{
  return this.http.get<any[]>(
    'http://localhost:5276/Match/GetActiveMatches'
  )
}
}
