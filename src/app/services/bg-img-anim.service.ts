import { Injectable } from '@angular/core';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class BgImgAnimService {

  private _animStopped = new BehaviorSubject<boolean>(false);
  private _blur = new BehaviorSubject<string>('0');

  constructor() {}

  /**
   * Get observable for changes of the state of
   * the animation.
   * @returns {BehaviorSubject}
   */
  get animStopped(): BehaviorSubject<boolean> {
    return this._animStopped;
  }

  /**
   * Stop animation.
   */
  stopAnim() {
    this._animStopped.next(true);
  }

  /**
   * Start animation.
   */
  startAnim() {
    this._animStopped.next(false);
  }

  /**
   * Get observable for changes of the blur
   * to be applied on the image.
   * @returns {BehaviorSubject}
   */
  get blur(): BehaviorSubject<string> {
    return this._blur;
  }

  /**
   * Set blur value to apply on the image.
   * @param value
   */
  animChangeBlur(value: string) {
    this._blur.next(value);
  }

}
