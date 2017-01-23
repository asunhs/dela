import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/Rx';

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
}
