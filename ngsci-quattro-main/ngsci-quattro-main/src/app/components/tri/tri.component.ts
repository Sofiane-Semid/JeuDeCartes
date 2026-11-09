import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Card } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-tri',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, CardComponent],
  templateUrl: './tri.component.html',
  styleUrl: './tri.component.css'
})
export class TriComponent {
  @Input() liste: Card[] = []; //liste reçue de magasin ou de playerCards
  listeTriee: Card[] = []; //liste à utiliser pour affichage
  statSelectionne: string = "Attack";
  ordreSelectionne: string = "asc";

  ngOnChanges() {
    this.tri();
  }

  //TODO: Faire une méthode pour le tri
  tri() {

    this.listeTriee = [...this.liste].sort((a, b) => {

      let valeurA = 0;
      let valeurB = 0;

      if (this.statSelectionne === "Attack") {
        valeurA = a.attack;
        valeurB = b.attack;
      }
      else if (this.statSelectionne === "Health") {
        valeurA = a.health;
        valeurB = b.health;
      }
      else if (this.statSelectionne === "ManaCost") {
        valeurA = a.cost;
        valeurB = b.cost;
      }

      return this.ordreSelectionne === "asc"
        ? valeurA - valeurB
        : valeurB - valeurA;
    });
  }
}
