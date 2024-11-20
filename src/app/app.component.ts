import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CubeRootPipe } from './cube-root.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoviesStatListComponent } from './movies/movies-stat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CubeRootPipe, FormsModule, MoviesStatListComponent],

  template: `
    <h1>the cube of {{ input }} is {{ input | cubeRoot }}</h1>
    <input type="text" [(ngModel)]="input" type="number" />
    <div>
      <app-movies-stat />
    </div>
  `,
  styles: `

  
  `,
})
export class AppComponent {
  title = 'pure-pipes-and-memoization';

  input: number = 0;

  // @Memoise
  get cube() {
    console.log('cube ran');
    return this.input * this.input * this.input;
  }
}
// ppppp
//ppp
