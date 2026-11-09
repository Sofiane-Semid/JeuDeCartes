import { Component, input, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/models';
import { MatCardModule } from '@angular/material/card';
import { transition } from '@angular/animations';
import{trigger,useAnimation} from "@angular/animations";
import { lastValueFrom, timer } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    standalone: true,
    imports: [MatCardModule, CommonModule],
    animations:[
      
    ]
    
})
export class CardComponent implements OnInit {

  @Input() card?:Card;
  @Input() show:string = "front";
  @Input() health:number = 0;
  @Input() animate: boolean = false;
  @Input() powerClass: string|null=null;
  myAnimation=false
  indexVal=-1
  beautifulBackUrl = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_1024,h_1420/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiIvZi80Zjc3MDVlYy04YzQ5LTRlZWQtYTU2ZS1jMjFmMzk4NTI1NGMvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.364HskpTM11MwvEzmMXHqIkEbcA318yjhAaLQ9LsH0E";

  constructor() { }

  ngOnInit() {
      console.log(this.card)
  }
  
  async myAnimationUse(count:number){
    this.indexVal=-1
    console.log(count)
    this.indexVal++
    
    for(let i=0; i<=count;i++){
      await lastValueFrom(timer(1000))
      this.indexVal++;
      console.log(this.indexVal)
    }
    
    this.indexVal=-1
    
  }

  getRareteClass(rarete: any): string {
  if (rarete === "Commune" || rarete === 0) return 'rarete-commune';
  if (rarete === "Rare" || rarete === 1) return 'rarete-rare';
  if (rarete === "Epique" || rarete === 2) return 'rarete-epique';
  if (rarete === "Legendaire" || rarete === 3) return 'rarete-legendaire';
  return '';
}
}
