import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/Rx';

const CAL_LEVEL = {
  'SUPER_HIGH': 'super-high',
  'HIGH': 'high',
  'NORMAL': 'normal',
  'LOW': 'low',
  'SUPER_LOW': 'super-low'
};

const matcher = /[^\d\.]/g;

@Injectable()
export class DelaService {

  private JAMSIL:string = "https://dela-mini.firebaseio.com/delacourt/jamsil.json";
  private RND:string = "https://dela-mini.firebaseio.com/delacourt/rnd.json";
  private SANGAM:string = "https://dela-mini.firebaseio.com/delacourt/sangam.json";
  private loading = false;

  constructor(private jsonp: Jsonp) { }

  getJamsil(): Promise<any> {
    return this.getMenus(this.JAMSIL);
  }

  getRnd(): Promise<any> {
    return this.getMenus(this.RND);
  }

  getSangam(): Promise<any> {
    return this.getMenus(this.SANGAM);
  }

  isLoading() {
    return !!this.loading;
  }

  getMenus(url:string): Promise<any> {

    let params = new URLSearchParams();

    params.set('callback', 'JSONP_CALLBACK');

    this.loading = true;

    return this.jsonp.get(url, {
      search: params
    }).map(response => response.json()).toPromise().then(res => {
      this.loading = false;
      return res;
    }, res => {
      this.loading = false;
      return res;
    });
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
