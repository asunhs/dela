import { Component } from '@angular/core';
import { DelaService } from '../dela/dela.service';
import * as _ from 'lodash';

@Component({
  selector: 'dela-rnd',
  templateUrl: './rnd.component.html',
  styleUrls: ['./rnd.component.scss']
})
export class RndComponent {
  
  meal:number = 1;
  dela: any = {
    menus: []
  };
  zoneIds = ['A','B'];

  constructor(private delaService:DelaService) {
    delaService.getRnd().then(dela => this.dela = dela);
    this.meal = this.now();
  }

  getFilteredMenus() {
    return _.filter(this.dela.menus[this.meal], (menu:any) => {
      return this.isFilteredZone(menu.zoneId);
    });
  }

  isFilteredZone(zoneId) {
    return _.includes(this.zoneIds, zoneId);
  }

  toggleZoneFilter(zoneId) {
    if (this.isFilteredZone(zoneId)) {
      _.pull(this.zoneIds, zoneId);
    } else {
      this.zoneIds.push(zoneId);
    }
  }

  now():number {

    let now:Date = new Date();
    let hour = now.getHours();

    if (hour < 9) {
      return 0;
    } else if (hour >= 14) {
      return 2;
    } else {
      return 1;
    }
  }
}
