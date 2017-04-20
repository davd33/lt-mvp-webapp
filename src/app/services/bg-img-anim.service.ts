import { Injectable } from '@angular/core';

@Injectable()
export class BgImgAnimService {

  private _animStopped = false;
  private _blur: string = "0";

  constructor() {}

  get animStopped(): boolean {
    return this._animStopped;
  }

  set animStopped(value: boolean) {
    this._animStopped = value;
  }

  get blur(): string {
    return this._blur;
  }

  set blur(value: string) {
    this._blur = value;
  }

}
