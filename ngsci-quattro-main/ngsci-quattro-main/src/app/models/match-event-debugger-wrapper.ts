import { MatchEvent } from "./models";

export interface MatchEventDebuggerWrapper {
  id: number;
  creationDate: Date;
  matchEvent: MatchEvent;
}