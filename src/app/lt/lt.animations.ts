import {animate, state, style, transition, trigger} from '@angular/animations';

const invalidBgColor = 'transparent';
const invalidTxtColor = 'darkred';
const validBgColor = 'transparent';
const validTxtColor = 'green';
const untouchedTxtColor = 'white';

export function luckenAnimations() {
  return trigger('hole', [
    state('untouched', style({
      'color': untouchedTxtColor
    })),
    state('invalid', style({
      'border-color': invalidBgColor,
      'background': invalidBgColor,
      'color': invalidTxtColor,
      'text-shadow': `1px 1px 1px ${invalidTxtColor}`
    })),
    state('valid', style({
      'border-color': validBgColor,
      'background': validBgColor,
      'color': validTxtColor,
      'text-shadow': `1px 1px 1px ${validTxtColor}`
    })),
    transition('* => valid', [
      animate('200ms ease-in')
    ]),
    transition('untouched => invalid', [
      animate('200ms ease-in')
    ])
  ]);
}
