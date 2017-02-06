import { Inject, Injectable, OpaqueToken, EventEmitter } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/Rx';

const CAL_LEVEL = {
  'SUPER_HIGH': 'super-high',
  'HIGH': 'high',
  'NORMAL': 'normal',
  'LOW': 'low',
  'SUPER_LOW': 'super-low'
};

const matcher = /[^\d\.]/g;

export const API_URL = new OpaqueToken("API_URL");

@Injectable()
export class DelaService {

  public loading = new EventEmitter<boolean>();

  constructor(private jsonp: Jsonp) { }

  getMenus(url:string): Observable<any> {

    let params = new URLSearchParams();

    params.set('callback', 'JSONP_CALLBACK');

    this.loading.next(true);

    return this.jsonp.get(url, {
      search: params
    }).map(response => response.json()).do(() => this.loading.next(false));
  }

  classify(calorieStr: string): string {

    let calories = this.toNumber(calorieStr);

    if (calories > 900) {
        return CAL_LEVEL.SUPER_HIGH;
    } else if (calories > 850) {
        return CAL_LEVEL.HIGH;
    } else if (calories < 600) {
        return CAL_LEVEL.SUPER_LOW;
    } else if (calories < 650) {
        return CAL_LEVEL.LOW;
    } else {
        return CAL_LEVEL.NORMAL;
    }
  }

  toNumber(value: string): number {
    return parseInt(value.replace(matcher, ''))
  }
}
