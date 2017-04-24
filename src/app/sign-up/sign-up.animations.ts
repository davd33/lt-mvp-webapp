import {animate, state, style, transition, trigger} from "@angular/animations";

export function anims() {
  return trigger('sliderAnim', [
    transition(':enter', [
      style({opacity: 0}),
      animate('.2s .2s ease-in', style({opacity: 1}))
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('.2s ease-in', style({opacity: 0}))
    ])
  ]);
}
