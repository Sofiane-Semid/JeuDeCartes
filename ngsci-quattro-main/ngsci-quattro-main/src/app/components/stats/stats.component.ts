import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CardComponent } from '../card/card.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Deck } from 'src/app/models/models';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

interface ChartDataPoint {
  label?: string;
  x?: number;
  y: number;
}

interface PieDataPoint {
  name: string;
  y: number;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, CardComponent, MatSnackBarModule, RouterOutlet, CanvasJSAngularChartsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  constructor(public router: Router, public api: ApiService) { }
  nbVictoires: number = 0;
  nbDefaites: number = 0;

  deckName: string = '';
  selectedDeckId: number = -1;
  decks: Deck[] = [];
  cards: any[] = [];
  manaChart: any;
  rarityChart: any;
  attackDefenseChart: any;
  

  onManaChartInit(chart: any) {
    this.manaChart = chart;
  }

  onRarityChartInit(chart: any) {
    this.rarityChart = chart;
  }

  onAttackDefenseChartInit(chart: any) {
    this.attackDefenseChart = chart;
  }

  async ngOnInit() {
    //Aller chercher les stats du joueur à l'ouverture de la page
    this.decks = await this.api.getPlayerDeck();
    await this.loadGlobalStats();
  }

  async onChange() {
    if (this.selectedDeckId === -1) {
      await this.loadGlobalStats();
    } else {
      await this.loadDeckStats(this.selectedDeckId);
    }
  }

  async loadGlobalStats() { //loader les stats de ToutesLesCartes
    const stats = await this.api.getPlayerStats();
    this.nbVictoires = stats.nbVictoires;
    this.nbDefaites = stats.nbDefaites;
    this.cards = stats.cards;
    this.updateCharts();
  }

  async loadDeckStats(deckId: number) { //loader les stats d'un Deck
    const stats = await this.api.getDeckStats(deckId);
    this.nbVictoires = stats.nbVictoires;
    this.nbDefaites = stats.nbDefaites;
    this.cards = stats.cards;
    this.updateCharts();
  }

  updateCharts() {
    this.updateManaChart();
    this.updateRarityChart();
    this.updateAttackDefenseChart();

    this.manaChart?.render();
    this.rarityChart?.render();
    this.attackDefenseChart.render();
  }

  updateManaChart() {
    const map: any = {};

    this.cards.forEach(card => {
      const cost = card.cost;
      map[cost] = (map[cost] || 0) + 1;
    });

    this.CoutMana.data[0].dataPoints = Object.keys(map).map(k => ({
      label: k,
      y: map[k]
    }));
  }

  updateRarityChart() {
    const map: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0
    };

    const rarityLabels: Record<number, string> = {
      1: "Commune",
      2: "Rare",
      3: "Épique",
      4: "Légendaire"
    };

    this.cards.forEach(card => {
      const rarity = Number(card.rarete) + 1;
      if (map[rarity] !== undefined) {
        map[rarity]++;
      }
    });

    this.graphiqueRaretes.data[0].dataPoints = [1, 2, 3, 4]
      .filter(k => map[k] > 0)
      .map(k => ({
        name: rarityLabels[k],
        y: map[k]
      }));
  }

  updateAttackDefenseChart() {
    const attackMap: Record<number, number> = {};
    const defenseMap: Record<number, number> = {};

    this.cards.forEach(card => {
      attackMap[card.attack] = (attackMap[card.attack] || 0) + 1;
      defenseMap[card.health] = (defenseMap[card.health] || 0) + 1;
    });

    const allValues = Array.from(
      new Set([
        ...Object.keys(attackMap),
        ...Object.keys(defenseMap)
      ])
    ).map(Number).sort((a, b) => a - b);

    const attackDataPoints = allValues.map(v => ({
      label: v.toString(),
      y: attackMap[v] || 0
    }));

    const defenseDataPoints = allValues.map(v => ({
      label: v.toString(),
      y: defenseMap[v] || 0
    }));

    this.AttaqueDefense.data[0].dataPoints = defenseDataPoints;
    this.AttaqueDefense.data[1].dataPoints = attackDataPoints;
  }

  CoutMana = {
    title:{
      text: "Coût en mana"
    },
    animationEnabled: true,
    axisX: {
      interval: 1 // empêche les doublons
    },
    axisY: {
      includeZero: true,
      interval: 1,
      valueFormatString: "#"
    },
    data: [{
      type: "bar",
      indexLabel: "{y}",
      yValueFormatString: "#,###",
      dataPoints: [] as ChartDataPoint[]
    }]
  }

  graphiqueRaretes = {
	  animationEnabled: true,
	  title: {
		text: "Nombre de Cartes par Rareté"
	  },
	  data: [{
		type: "pie",
		startAngle: -90,
		indexLabel: "{name}: {y}",
		yValueFormatString: "#,###.##",
		dataPoints: [] as PieDataPoint[]
	  }]
	}

  AttaqueDefense = {
  animationEnabled: true,
  title: {
    text: "Attaque et Défense"
  },
  axisX: {
    labelAngle: -45
  },
  axisY: {
    title: "Valeur",
    includeZero: true
  },
  toolTip: {
    shared: true
  },
  legend:{
    cursor:"pointer",
    itemclick: function(e: any){
      e.dataSeries.visible = !(e.dataSeries.visible ?? true);
      e.chart.render();
    }
  },
  data: [{
    type: "column",	
    name: "Défense",
    showInLegend: true, 
    dataPoints: [] as ChartDataPoint[]
  }, {
    type: "column",	
    name: "Attaque",
    showInLegend: true,
    dataPoints: [] as ChartDataPoint[]
  }]
}

}
