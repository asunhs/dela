import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class DelaService {

  private JAMSIL:string = "https://dela-mini.firebaseio.com/delacourt/jamsil.json";

  constructor(private jsonp: Jsonp) { }

  getMenus(): Promise<any> {

    let params = new URLSearchParams();

    params.set('callback', 'JSONP_CALLBACK')

    return this.jsonp.get(this.JAMSIL, {
      search: params
    }).map(response => response.json()).toPromise();
  }
}
