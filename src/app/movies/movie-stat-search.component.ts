import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Movie } from './types';
import { movies } from './data/movies';
import { AggregateMoviePipe } from '../aggregate-movie.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies-search',
  standalone: true,
  imports: [AggregateMoviePipe, FormsModule],
  template: `
    <div class="flexi mt-2">
      <div>
        <p>from</p>
        <input type="text" #dateFrom type="number" />
      </div>
      <div>
        <p>to</p>
        <input type="text" #dateTo type="number" />
      </div>

      <button (click)="search()">search</button>
    </div>
    <table>
      <tr>
        <th>year</th>
        <th>total number of movies</th>
        <th>total actors</th>
        <th>total genres</th>
      </tr>

      @for (summary of movies | aggregateMovie:from:to ; track $index) {
      <tr>
        <td>{{ summary.year }}</td>
        <td>{{ summary.totalMovies }}</td>
        <td>{{ summary.totalActors }}</td>
        <td>{{ summary.totalGenres }}</td>
      </tr>
      }
    </table>
  `,

  styles: `
  *{
    margin:0;
    padding: 0
  }
  table,td{
   border-collapse:collapse;
   border: 2px solid #000;
  }
  .flexi{
    display:flex;
    gap: 20px
  }

  .mt-2{
    margin-top: 20px
  }
 
 `,
})
export class MoviesSearchComponent {
  movies: Movie[] = movies;
  from: number = 0;
  to: number = 2024;

  @ViewChild('dateFrom') inputFrom!: ElementRef<HTMLInputElement>;
  @ViewChild('dateTo') inputTo!: ElementRef<HTMLInputElement>;

  search() {
    this.from = Number(this.inputFrom.nativeElement.value);
    this.to = Number(this.inputTo.nativeElement.value);
  }
}
