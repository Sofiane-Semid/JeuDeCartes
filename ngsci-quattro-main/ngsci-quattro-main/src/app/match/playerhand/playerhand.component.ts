import { Component, Input, OnInit } from '@angular/core';
import { PlayableCard } from 'src/app/models/models';
import { CardComponent } from '../../components/card/card.component';
import { MatchService } from 'src/app/services/match.service';
import { MatchComponent } from '../match.component';
import { card } from 'mermaid/dist/rendering-util/rendering-elements/shapes/card';

@Component({
    selector: 'app-playerhand',
    templateUrl: './playerhand.component.html',
    styleUrls: ['./playerhand.component.css'],
    standalone: true,
    imports: [CardComponent]
})
export class PlayerhandComponent implements OnInit {

  @Input() cards: PlayableCard[] = [];

  constructor(public matchComponent: MatchComponent) { }

  ngOnInit() {
  }

  click(playableCardId:any,cardId:any){
    // TODO: Utiliser seulement une fois que l'on peut jouer des cartes (TP2)
    
    this.matchComponent.playCard(playableCardId,cardId)
  }
}
