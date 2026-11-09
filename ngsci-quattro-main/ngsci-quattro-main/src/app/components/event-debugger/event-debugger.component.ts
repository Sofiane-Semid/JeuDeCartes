import { Component, inject, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { EventDebuggerDetailsComponent } from './event-debugger-details/event-debugger-details.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatchEventDebuggerWrapper } from 'src/app/models/match-event-debugger-wrapper';
import { EventDebuggerService } from 'src/app/services/event-debugger.service';

@Component({
  selector: 'app-event-debugger',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterModule,
    EventDebuggerDetailsComponent,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './event-debugger.component.html',
  styleUrl: './event-debugger.component.scss',
})
export class EventDebuggerComponent implements OnInit {
  readonly eventDebuggerService = inject(EventDebuggerService);

  selectedEvent = signal<MatchEventDebuggerWrapper | null>(null);
  events = signal<MatchEventDebuggerWrapper[]>([]);

  ngOnInit(): void {
    this.refreshEvents();
  }

  deleteEvent(id: number) {
    this.eventDebuggerService.deleteEvent(id);
    this.refreshEvents();
  }

  deleteAllEvents() {
    this.eventDebuggerService.deleteAllEvents();
    this.refreshEvents();
  }

  refreshEvents() {
    this.events.set(this.eventDebuggerService.getMatchEvents());
    this.selectedEvent.set(this.events()[0]);
  }

  exportEvent(eventId: number) {
    this.eventDebuggerService.exportEvent(eventId);
  }

  exportEvents() {
    this.eventDebuggerService.exportEvents(this.events());
  }

  importEvents() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement).files![0];
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        this.eventDebuggerService.importEvents(fileContent);
        this.refreshEvents();
      };
      reader.readAsText(file);
    });
    fileInput.click();
  }
}
