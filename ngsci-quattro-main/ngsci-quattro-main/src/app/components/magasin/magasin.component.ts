import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Card } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { TriComponent } from '../tri/tri.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-magasin',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, TriComponent, CardComponent],
  templateUrl: './magasin.component.html',
  styleUrl: './magasin.component.css'
})
export class MagasinComponent {
  constructor(public router: Router, public api: ApiService) { }

  packs: any[] = [];
openedCards: Card[] = [];
showPackDialog: boolean = false;

async ngOnInit() {
  this.packs = await this.api.getPacks();
}

async buyPack(packId: number) {
 try {
    const result = await this.api.openPack(packId);

    this.openedCards = result.cards;
    this.showPackDialog = true;

  } catch (error: any) {
    alert(error.error); 
  }
}
closeDialog() {
  this.showPackDialog = false;
}
  toutesCartes: Card[] = [
  //POUR TESTER L'AFFICHAGE
  // { 
  //   id: 1,
  //   name: "Pikachu",
  //   attack: 4,
  //   health: 3,
  //   cost: 2,
  //   imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  // },
  // {
  //   id: 2,
  //   name: "Dracaufeu",
  //   attack: 9,
  //   health: 8,
  //   cost: 7,
  //   imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
  // },
  // {
  //   id: 3,
  //   name: "Bulbizarre",
  //   attack: 3,
  //   health: 5,
  //   cost: 3,
  //   imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  // },
  // {
  //   id: 4,
  //   name: "Carapuce",
  //   attack: 2,
  //   health: 6,
  //   cost: 3,
  //   imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
  // },
  // {
  //   id: 5,
  //   name: "Mewtwo",
  //   attack: 10,
  //   health: 7,
  //   cost: 8,
  //   imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png"
  // },
  // {
  //   id: 6,
  //   name: "Roucool",
  //   attack: 2,
  //   health: 2,
  //   cost: 1,
  //   imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png"
  // },
  // {
  //   id: 7,
  //   name: "Ectoplasma",
  //   attack: 7,
  //   health: 4,
  //   cost: 5,
  //   imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
  // },
  // {
  //   id: 8,
  //   name: "Ronflex",
  //   attack: 6,
  //   health: 10,
  //   cost: 6,
  //   imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png"
  // }
];

 

}
