import { Component } from '@angular/core';
import { CaloriesFiltered } from '../dela/calories-filtered';
import { DelaService } from '../dela/dela.service';

import * as _ from 'lodash';

@Component({
  selector: 'dela-jamsil',
  templateUrl: './sangam.component.html',
  styles: []
})
export class SangamComponent extends CaloriesFiltered {
  
  dela: any = {};

  constructor(private delaService:DelaService) {
    super();
    this.init();
    delaService.getSangam().then(dela => this.dela = dela);
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
