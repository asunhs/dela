import { Component } from '@angular/core';
import { DelaService } from '../dela/dela.service';

import * as _ from 'lodash';

@Component({
  selector: 'dela-jamsil',
  templateUrl: './jamsil.component.html',
  styleUrls: ['./jamsil.component.scss']
})
export class JamsilComponent {
  
  dela: any = {};
  zoneIds = ['B1','B2'];

  constructor(delaService:DelaService) {
    delaService.getJamsil().then(dela => this.dela = dela);
  }

  getFilteredMenus() {
    return _.filter(this.dela.menus, (menu:any) => {
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
}
