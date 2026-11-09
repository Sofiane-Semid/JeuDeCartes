import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatchComponent } from './match/match.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EventDebuggerComponent } from './components/event-debugger/event-debugger.component';
import { PlayerCardsComponent } from './components/player-cards/player-cards.component';
import { MagasinComponent } from './components/magasin/magasin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { connectedGuard } from './connected.guard';
import { DeckComponent } from './components/deck/deck.component';
import { PartiesComponent } from './components/parties/parties.component';
import { StatsComponent } from './components/stats/stats.component';

const routes: Routes = [
   { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'event-debugger', component: EventDebuggerComponent },
  { path: 'match/:id', component: MatchComponent, canActivate: [connectedGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

{
  path: 'home',
  component: HomeComponent,
  children: [
    { path: '', component: WelcomeComponent },
    { path: "cards", component: PlayerCardsComponent, canActivate: [connectedGuard] },
    { path: "store", component: MagasinComponent, canActivate: [connectedGuard] },
    { path: "deck", component: DeckComponent, canActivate: [connectedGuard] },
    {path:"parties", component: PartiesComponent}
    { path: "stats", component: StatsComponent, canActivate: [connectedGuard] }
  ],
},

  //{ path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
