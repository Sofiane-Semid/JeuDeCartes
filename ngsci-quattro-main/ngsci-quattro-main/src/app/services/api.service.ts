import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Card, Deck, Player } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //serverUrl = "https://localhost:7179/";
   serverUrl = "http://localhost:5276/";


  constructor(public http: HttpClient) { }

  async getAllCards(): Promise<Card[]> {
    let result = await lastValueFrom(this.http.get<Card[]>(this.serverUrl + 'api/card/GetAllCards'));
    return result;
  }

  async getPlayersCards(): Promise<Card[]> {
    let result = await lastValueFrom(this.http.get<Card[]>(this.serverUrl + 'api/card/GetPlayersCards'));
    return result;
  }
  async login(username: string, password: string): Promise<void> {
    const loginDTO = {
      username: username,
      password: password
    };

    const x = await lastValueFrom(
      this.http.post<any>(this.serverUrl + 'api/User/Login', loginDTO)
    );


    sessionStorage.setItem('token', x.token);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem("playerId", JSON.stringify(x.playerId));
    sessionStorage.setItem("coins", x.coins);
  }

  async register(username: string, email: string, password: string, passwordConfirm: string): Promise<void> {
    const registerDTO = {
      username: username,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm
    };

    const x = await lastValueFrom(
      this.http.post<any>(this.serverUrl + 'api/User/Register', registerDTO)
    );

    sessionStorage.setItem("elo", x.elo);
    sessionStorage.setItem('token', x.token);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem("playerId", JSON.stringify(x.playerId));
  }

  async getPrivateData(): Promise<string[]> {
    return await lastValueFrom(
      this.http.get<string[]>(this.serverUrl + 'api/User/PrivateData')
    );
  }

  isLogged(){ 
    if(sessionStorage.getItem("playerId") != null){
      return true
    }
    return false
  }

  async createDeck(name: string): Promise<number> {
  return await lastValueFrom(
    this.http.post<number>(this.serverUrl + 'api/Deck/CreateDeck', {
      name: name
    })
  );
}

  async deleteDeck(deckId: number) {
    //APPELER SERVEUR
    return await lastValueFrom(
      this.http.delete<any>(this.serverUrl + 'api/Deck/DeleteDeck/' + deckId)
    );
  }

  async ajouterCarte(deckId: number, card: Card) {
    const modifyDeckDto = {
      deckId: deckId,
      cardId: card.id
    };

    await lastValueFrom(
      this.http.put(
        this.serverUrl + 'api/Deck/AjouterCarte',
        modifyDeckDto
      )
    );
  }

  async retirerCarte(deckId: number, card: Card) {
    const modifyDeckDto = {
      deckId: deckId,
      cardId: card.id
    };

    await lastValueFrom(
      this.http.put(
        this.serverUrl + 'api/Deck/RetirerCarte',
        modifyDeckDto
      )
    );
  }

  async getPlayerDeck(): Promise<Deck[]> {
    return await lastValueFrom(
      this.http.get<Deck[]>(this.serverUrl + 'api/Deck/GetPlayerDecks')
    );
  }

  async getDeckCards(deckId: number): Promise<Card[]> {
    return await lastValueFrom(
      this.http.get<Card[]>(this.serverUrl + 'api/Deck/GetDeckCards/' + deckId)
    );
  }

  async setCurrentDeck(deckId: number) {
    await lastValueFrom(
      this.http.put(this.serverUrl + 'api/Deck/SetCurrentDeck/' + deckId, {})
    );
  }

  async getCurrentDeck(): Promise<number | null> {
    return await lastValueFrom(
      this.http.get<number | null>(this.serverUrl + 'api/Deck/GetCurrentDeck')
    );
  }
async getPacks(): Promise<any[]> {
  return await lastValueFrom(
    this.http.get<any[]>(this.serverUrl + 'api/Pack')
  );
}

async openPack(packId: number): Promise<any> {
  const res = await lastValueFrom(
  this.http.post<any>(this.serverUrl + 'api/Pack/open/' + packId, {})
);

sessionStorage.setItem("coins", res.coins);
  return res;
}

async getPlayerStats() {
  return await lastValueFrom(
    this.http.get<any>(this.serverUrl + 'api/Stats/player')
  );
}

async getDeckStats(deckId: number) {
  return await lastValueFrom(
    this.http.get<any>(this.serverUrl + 'api/Stats/deck/' + deckId)
  );
}
  
}
