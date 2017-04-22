import {animate, state, style, transition, trigger} from '@angular/animations';

export function flagAnim() {
  return trigger('flag', [
    state('*', style({
      opacity: 1
    })),
    transition(':enter', [
      style({opacity: 0}),
      animate('.2s ease-in')
    ]),
    transition(':leave', [
      animate('.2s ease-out', style({opacity: 0}))
    ])
  ]);
}
