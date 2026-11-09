import { Injectable } from '@angular/core';
import { MatchEventDebuggerWrapper } from '../models/match-event-debugger-wrapper';
import { MatchEvent } from '../models/models';
import { log } from 'mermaid/dist/logger';

@Injectable({
  providedIn: 'root',
})
export class EventDebuggerService {
  constructor() { }

  clearEvents() {
    localStorage.removeItem('matchEvents');
  }

  deleteEvent(id: number) {
    let events = this.getMatchEvents().filter((event) => event.id !== id);
    localStorage.setItem('matchEvents', JSON.stringify(events));
  }

  addMatchEvent(event: MatchEvent) {
    let events = this.getMatchEvents();
    const wrapper: MatchEventDebuggerWrapper = {
      id: events.length,
      creationDate: new Date(),
      matchEvent: event,
    };
    this.addMatchEventDebuggerWrapper(wrapper);
  }

  addMatchEventDebuggerWrapper(wrapper: MatchEventDebuggerWrapper) {
    let events = this.getMatchEvents();
    wrapper.id = events.length;
    wrapper.creationDate = new Date(wrapper.creationDate);
    events.unshift(wrapper);
    events = events.sort(
      (a, b) => b.creationDate.getTime() - a.creationDate.getTime(),
    );
    localStorage.setItem('matchEvents', JSON.stringify(events));
  }

  getMatchEvents(): MatchEventDebuggerWrapper[] {
    const serializedEvents = localStorage.getItem('matchEvents');
    if (serializedEvents) {
      return (JSON.parse(serializedEvents) as MatchEventDebuggerWrapper[]).map(
        (event) => {
          event.creationDate = new Date(event.creationDate);
          return event;
        },
      );
    } else {
      return [];
    }
  }

  public eventToMermaidGraph(event: MatchEventDebuggerWrapper): string {
    let graph =
      '---\nconfig:\n  class:\n    hideEmptyMembersBox: true\n---\nclassDiagram\n';
    graph = this.buildMermaidGraph(event.matchEvent, graph);
    return graph;
  }

  deleteAllEvents() {
    localStorage.removeItem('matchEvents');
  }

  private buildMermaidGraph(
    event: MatchEvent,
    graph: string,
    parentId?: string,
  ): string {
    const eventId = `${event.eventType}${Math.random().toString(36).substring(2, 9)}`;
    graph += `  class ${eventId}["${event.eventType}"] {\n${this.getEventyProperties(event)} }\n`;

    if (parentId) {
      graph += `  ${parentId} --> ${eventId}\n`;
    }
    if (event.events && event.events.length > 0) {
      event.events.forEach((childEvent) => {
        graph = this.buildMermaidGraph(childEvent, graph, eventId);
      });
    }
    return graph;
  }

  private getEventyProperties(event: any): string {
    let properties = '';
    for (const key in event) {
      if (key !== 'events') {
        if (typeof event[key] == 'string') {
          properties += `  ${key}: "${event[key]}"\n`;
        } else {
          properties += `  ${key}: ${event[key]}\n`;
        }
      }
    }
    return properties;
  }

  getEvent(eventId: number): MatchEventDebuggerWrapper {
    return this.getMatchEvents().find((event) => event.id === eventId)!;
  }

  exportEvent(eventId: number) {
    const event = this.getEvent(eventId);
    this.exportEvents([event]);
  }

  exportEvents(events: MatchEventDebuggerWrapper[]) {
    const blob = new Blob([JSON.stringify(events)], {
      type: 'application/json',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `events.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  importEvents(fileContent: string) {
    const events = JSON.parse(fileContent);
    events.forEach((event: MatchEventDebuggerWrapper) => {
      this.addMatchEventDebuggerWrapper(event);
    });
  }
}
