import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Card } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { TriComponent } from '../tri/tri.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-player-cards',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, TriComponent, CardComponent],
  templateUrl: './player-cards.component.html',
  styleUrl: './player-cards.component.css'
})
export class PlayerCardsComponent {
  constructor(public router: Router, public api: ApiService) { }
  cartesJoueur: Card[] = []

  async ngOnInit(){
    this.cartesJoueur = await this.api.getPlayersCards();
  }
}
