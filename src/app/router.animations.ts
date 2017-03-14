import {trigger, state, animate, style, transition, keyframes} from '@angular/core';

export function routerTransition() {
  return slideToLeft();
}

function slideToLeft() {
  return trigger('routerTransition', [
    state('void', style({
      width: '100%',
      height: '80%',
      position: 'fixed',
      top: '20%',
      overflow: 'auto',
      background: '#ffcc00'
    })),
    state('*', style({
      width: '100%',
      height: '80%',
      position: 'fixed',
      top: '20%',
      overflow: 'auto',
      background: '#ffcc00'
    }) ),
    transition(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    ])
  ]);
}
