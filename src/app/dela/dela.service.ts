import { Inject, Injectable, OpaqueToken, EventEmitter } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/Rx';
import * as _ from 'lodash';

export const CAL_LEVEL = {
  'SUPER_HIGH': 'super-high',
  'HIGH': 'high',
  'NORMAL': 'normal',
  'LOW': 'low',
  'SUPER_LOW': 'super-low'
};

export const CALORIES = {
  [CAL_LEVEL.SUPER_HIGH]: '초고',
  [CAL_LEVEL.HIGH]: '높음',
  [CAL_LEVEL.NORMAL]: '표준',
  [CAL_LEVEL.LOW]: '낮음',
  [CAL_LEVEL.SUPER_LOW]: '초저'
};

const SOURCE = {
  jamsil: 'AS',
  sangam: 'SA',
  pangyo: 'PK',
  suwon: 'SW',
  gumi: 'GM'
};

const BASE = "https://dela-mini.firebaseio.com/delacourt/";
const SOURCE_BASE = "http://sdsfoodmenu.co.kr:9106/foodcourt/menuplanner/list?zoneId="

const matcher = /[^\d\.]/g;


@Injectable()
export class LoadingService {
  public loading = new EventEmitter<boolean>();
}



@Injectable()
export class DelaService {

  constructor(
    private jsonp: Jsonp,
    private loadingService: LoadingService
  ) { }

  getSource(path: string): string {
    return SOURCE_BASE + SOURCE[path];
  }

  getUrl(path:string): string {
    return [BASE, path, ".json"].join("");
  }

  getMenusFrom(path: string): Observable<any> {
    return this.getMenus(this.getUrl(path));
  }

  getMenus(url:string): Observable<any> {

    let params = new URLSearchParams();

    params.set('callback', 'JSONP_CALLBACK');

    this.loadingService.loading.next(true);

    return this.jsonp.get(url, {
      search: params
    }).map(response => response.json()).do(() => this.loadingService.loading.next(false));
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


@Injectable()
export class PlaceService {
  constructor(
    private delaService: DelaService,
    @Inject('API_URL') private url: string,
  ) { }

  getMenus() {
    return this.delaService.getMenus(this.url);
  }
}