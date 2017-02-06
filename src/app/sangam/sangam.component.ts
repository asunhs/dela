import { Inject, Component } from '@angular/core';
import { CaloriesFiltered } from '../dela/calories-filtered';
import { DelaService, API_URL } from '../dela/dela.service';

import * as _ from 'lodash';

@Component({
  selector: 'dela-jamsil',
  templateUrl: './sangam.component.html',
  styles: [],
  providers: [
    { provide: API_URL, useValue: "https://dela-mini.firebaseio.com/delacourt/sangam.json" }
  ]
})
export class SangamComponent extends CaloriesFiltered {
  
  dela: any = {};

  constructor(
    private delaService:DelaService,
    @Inject(API_URL) url: string
  ) {
    super();
    this.init();
    delaService.getMenus(url).subscribe(dela => this.dela = dela);
  }

  init() {
    super.init();
  }

  getFilteredMenus() {
    return _.filter(this.dela.menus, (menu:any) => {
      return this.isFilteredCalorie(this.delaService.classify(menu.cal));
    });
  }
}
