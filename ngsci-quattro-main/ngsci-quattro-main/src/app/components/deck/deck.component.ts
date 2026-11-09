import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatSelectModule } from '@angular/material/select';
import { Card, Deck } from 'src/app/models/models';
import { CardComponent } from '../card/card.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, CardComponent, MatSnackBarModule],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})
export class DeckComponent {
  constructor(public router: Router, public api: ApiService,private snackBar: MatSnackBar) { }
  
  deckName: string = '';
  selectedDeckId: number | null = null;
  decks: Deck[] = [];
  

  cartesJoueur: Card[] = [];
  cartesSelectionnes: Card[] = [];
  selectedCardId: number | null = null;

  currentDeckId: number | null = null;

  async ngOnInit() {
    this.decks = await this.api.getPlayerDeck();
    this.cartesJoueur = await this.api.getPlayersCards();

    this.cartesJoueur.sort((a, b) => a.name.localeCompare(b.name));

    this.currentDeckId = await this.api.getCurrentDeck();

    // sélection du premier deck
    if (this.decks.length > 0) {
      this.selectedDeckId = this.decks[0].id;

      // charger ses cartes
      this.onDeckChange();
    }
  }

  async createDeck() {
    if (!this.deckName) return;
    
    this.selectedDeckId = await this.api.createDeck(this.deckName);

    this.decks = await this.api.getPlayerDeck();
    this.deckName = '';
    this.onDeckChange()
  }

  async deleteDeck() {
    if (!this.selectedDeckId) return;
    if(this.selectedDeckId != this.currentDeckId){
      await this.api.deleteDeck(this.selectedDeckId)
    }
    else{
      this.snackBar.open("Vous ne pouvez pas supprimer le deck courrant", "Erreur", { duration: 3000 });
    }
    this.decks = await this.api.getPlayerDeck();
    this.selectedDeckId = null;
  }


  async ajouterCarte(card: Card) {
    if (!this.selectedDeckId) return;

    await this.api.ajouterCarte(this.selectedDeckId, card);

    this.onDeckChange();
  }

  async retirerCarte(card: Card) {
    if (!this.selectedDeckId) return;

    await this.api.retirerCarte(this.selectedDeckId, card);

    this.onDeckChange();
  }

  async setCurrentDeck() {
    if (!this.selectedDeckId) return;

    await this.api.setCurrentDeck(this.selectedDeckId);
    this.currentDeckId = this.selectedDeckId;
  }

  getCartesDisponibles(): Card[] {
    return this.cartesJoueur.filter(card => {
      
      const nbOwned = this.cartesJoueur.filter(c => c.id === card.id).length;
      const nbDansDeck = this.cartesSelectionnes.filter(c => c.id === card.id).length;

      return nbDansDeck < nbOwned;
    });
  }

  async onCardSelected() {
    if (!this.selectedDeckId || !this.selectedCardId) return;

    const card = this.cartesJoueur.find(c => c.id === this.selectedCardId);
    if (!card) return;

    await this.ajouterCarte(card);

    this.selectedCardId = null;
  }

  async onDeckChange() {
    if (!this.selectedDeckId) return;

    this.cartesSelectionnes = await this.api.getDeckCards(this.selectedDeckId);
  }
  
}

