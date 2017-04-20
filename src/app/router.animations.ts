import {trigger, state, animate, style, transition, keyframes} from '@angular/core';

const CONTAINER_STATE = {
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: '0',
  overflow: 'auto',
  background: 'transparent'
};

export function rtSimple() {
  return trigger('rtSimple', [

    state('void', style(CONTAINER_STATE)),
    state('*', style(CONTAINER_STATE)),

    transition(':enter', [
      style({opacity: '0'}),
      animate('0.5s ease-in-out', style({opacity: '1'}))
    ]),
    transition(':leave', [
      style({opacity: '1'}),
      animate('0.5s ease-in-out', style({opacity: '0'}))
    ])
  ]);
}

export function routerTransition() {
  return trigger('routerTransition', [

    state('void', style(CONTAINER_STATE)),
    state('*', style(CONTAINER_STATE)),

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

export function rtFadeInOut() {
  return trigger('rtFadeInOut', [

    state('void', style(CONTAINER_STATE)),
    state('*', style(CONTAINER_STATE)),

    transition(':enter', [
      style({transform: 'scale(5)', opacity: '0'}),
      animate('0.5s ease-in', style({transform: 'scale(1)', opacity: '1'}))
    ]),
    transition(':leave', [
      style({transform: 'scale(1)', opacity: '1'}),
      animate('0.2s ease-in', style({transform: 'scale(5)', opacity: '0'}))
    ])
  ]);
}

export function rtFadeInSlideUp() {
  return trigger('rtFadeInSlideUp', [

    state('void', style(CONTAINER_STATE)),
    state('*', style(CONTAINER_STATE)),

    transition(':enter', [
      style({transform: 'scale(5)', opacity: '0'}),
      animate('0.5s ease-in', style({transform: 'scale(1)', opacity: '1'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0)', opacity: '1'}),
      animate('0.2s ease-in', style({transform: 'translateY(-100%)', opacity: '0'}))
    ])
  ]);
}

export function rtFadeOut() {
  return trigger('rtFadeOut', [

    state('void', style(CONTAINER_STATE)),
    state('*', style(CONTAINER_STATE)),

    transition(':leave', [
      style({transform: 'scale(1)', opacity: '1'}),
      animate('0.2s ease-in', style({transform: 'scale(5)', opacity: '0'}))
    ])
  ]);
}
