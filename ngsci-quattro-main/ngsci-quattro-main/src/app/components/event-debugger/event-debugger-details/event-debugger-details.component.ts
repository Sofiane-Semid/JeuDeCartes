import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  ViewChild,
} from '@angular/core';
import mermaid from 'mermaid';
import { MatchEventDebuggerWrapper } from 'src/app/models/match-event-debugger-wrapper';
import { EventDebuggerService } from 'src/app/services/event-debugger.service';

@Component({
  selector: 'app-event-debugger-details',
  standalone: true,
  imports: [],
  templateUrl: './event-debugger-details.component.html',
  styleUrl: './event-debugger-details.component.scss',
})
export class EventDebuggerDetailsComponent {
  @ViewChild('mermaidContainer', { static: false })
  mermaidContainer!: ElementRef<HTMLPreElement>;

  firstRender = true;

  event = input.required<MatchEventDebuggerWrapper>();
  graph = computed(() => {
    return this.eventDebuggerService.eventToMermaidGraph(this.event());
  });

  constructor(public eventDebuggerService: EventDebuggerService) {
    mermaid.initialize({});

    effect(() => {
      const graphText = this.graph();
      if (this.mermaidContainer) {
        if(this.firstRender) {
          this.mermaidContainer.nativeElement.innerHTML = graphText;
          this.firstRender = false;
          return;
        }
        else{
          mermaid.render('generatedGraph', graphText).then(({ svg }) => {
            this.mermaidContainer.nativeElement.innerHTML = svg;
          });
        }
      }
    });
  }
}
