import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'counter',
  standalone: true,
  imports: [],
  template: `
    <p>
      {{ count }}
    </p>
    <button (click)="inc()">increment</button>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  count = 0;

  inc() {
    this.count++;
  }
}
