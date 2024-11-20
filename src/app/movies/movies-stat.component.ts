import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Movie } from './types';
import { movies } from './data/movies';
import { AggregateMoviePipe, movieAnalytics } from '../aggregate-movie.pipe';
import { MoviesSearchComponent } from './movie-stat-search.component';
import { CounterComponent } from '../counter.component';

@Component({
  selector: 'app-movies-stat',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AggregateMoviePipe, MoviesSearchComponent, CounterComponent],
  template: `
    <table>
      <tr>
        <th>year</th>
        <th>total number of movies</th>
        <th>total actors</th>
        <th>total genres</th>
      </tr>

      <!-- @for (summary of transform(movies) ; track $index) { -->
      @for (summary of movies | aggregateMovie ; track $index) {
      <tr>
        <td>{{ summary.year }}</td>
        <td>{{ summary.totalMovies }}</td>
        <td>{{ summary.totalActors }}</td>
        <td>{{ summary.totalGenres }}</td>
      </tr>
      }
    </table>

    <app-movies-search />
    <counter />
  `,

  styles: `
  table,td{
   border-collapse:collapse;
   border: 2px solid #000;
  }
 
 `,
})
export class MoviesStatListComponent {
  movies: Movie[] = movies;

  transform(
    movies: Movie[],
    from?: number,
    to: number = 2024
  ): movieAnalytics[] {
    const yearlyAnalytics = {} as Record<string, movieAnalytics>;
    let actors = new Set();
    let genres = new Set();

    for (const movie of movies) {
      let targetYear = movie.year;
      if (from && to) {
        if (targetYear < from || targetYear > to) {
          continue;
          ``;
        }
      }

      actors = new Set([...actors, ...movie.cast]);
      genres = new Set([...genres, ...movie.genres]);

      if (!yearlyAnalytics[targetYear]) {
        yearlyAnalytics[targetYear] = {
          totalMovies: 1,
          totalActors: actors.size,
          totalGenres: genres.size,
          year: movie.year,
        };
      } else {
        yearlyAnalytics[targetYear].totalMovies++;
        yearlyAnalytics[targetYear].totalActors += actors.size;
        yearlyAnalytics[targetYear].totalGenres += genres.size;
      }
    }
    console.log('agg recomputed ');
    return Object.values(yearlyAnalytics);
  }
}
