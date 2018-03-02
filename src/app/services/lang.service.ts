import { Injectable } from '@angular/core';

import {lang_en} from '../lang.en';

@Injectable()
export class LangService {

  static langList = {
    en: lang_en
  };

  private _lang = 'en';
  private _text;

  static lang(lang: string) {
    return this.langList[lang] || lang_en;
  }

  constructor() { }

  get lang(): string {
    return this._lang;
  }

  set lang(value: string) {
    this._lang = value;
  }

  get text(): any {
    if (!this._text) {
      if (this.lang === 'en') {
        this.setText(lang_en);
      }
    }

    return this._text;
  }

  private setText(value: any) {
    this._text = value;
  }
}
