import { Pipe, PipeTransform } from '@angular/core';
import memoize from 'memoize';

@Pipe({
  name: 'cubeRoot',
  standalone: true,
})
export class CubeRootPipe implements PipeTransform {
  constructor() {
    this.transform = memoize(this.transform.bind(this));
  }

  transform(v: number, ...args: unknown[]): number {
    console.log('pipe ran');

    return v * v * v;
  }
}
//
