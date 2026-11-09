export interface Player {
    id: number;
    name: string;
    nbVictoires: number;
    nbDefaites: number;
    elo: number;
}

export interface Card {
    id: number;
    name: string;
    attack: number;
    health: number;
    cost: number;
    imageUrl: string;
      rarete: number;
    cardPowers:Array<CardPowers>
}

export interface CardPowers{
        id:number;
        CardId:number;
        card:Card;
        PowerId:number;
        power: Power;
        value:number
}

export interface Power{
    id:number;
    name:string;
    description:string;
    icone:string;
}

export interface MatchData {
    match: Match;
    playerA: Player;
    playerB: Player;
    winningPlayerId: number;
}

export interface Match {
    id: number;
    isMatchCompleted: boolean;
    isPlayerATurn: boolean;
    playerDataA: PlayerData;
    playerDataB: PlayerData;
}

export interface PlayableCard {
    id: number;
    card: Card;
    health: number;
    attack:number;
    animate: boolean;
    powerClass:string|null;
    index:number;
}

export interface PlayerData {
    id: number;
    health: number;
    maxhealth: number;
    mana: number;
    playerId: number;
    playerName: string;
    cardsPile: PlayableCard[];
    hand: PlayableCard[];
    battleField: PlayableCard[];
    graveyard: PlayableCard[];
}

export interface MatchEvent {
    eventType: string;
    events: MatchEvent[];
}

export interface Deck {
    id: number;
    name: string;
    cartes: Card[];
    playerId: number;
    player: Player;
    nbVictoires: number;
    nbDefaites: number;
}