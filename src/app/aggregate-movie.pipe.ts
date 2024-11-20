import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from './movies/types';

function memoize(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const cache = new Map();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    return result;
  };

  return descriptor;
}

export type movieAnalytics = {
  totalMovies: number;
  totalActors: number;
  totalGenres: number;
  year: number;
};

@Pipe({
  name: 'aggregateMovie',
  standalone: true,
  pure: true,
})
export class AggregateMoviePipe implements PipeTransform {
  // @memoize
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
