import { Component, ViewChild } from '@angular/core';
import { CaloriesFiltered } from '../dela/calories-filtered';
import { DelaService } from '../dela/dela.service';
import { FolderDirective } from '../dela/folder.directive';

import * as _ from 'lodash';

@Component({
  selector: 'dela-jamsil',
  templateUrl: './jamsil.component.html',
  styleUrls: ['./jamsil.component.scss']
})
export class JamsilComponent extends CaloriesFiltered {
  
  dela: any = {};
  zoneIds = ['B1','B2'];

  @ViewChild(FolderDirective)
  private folder;

  constructor(private delaService:DelaService) {
    super();
    delaService.getJamsil().then(dela => this.dela = dela);
  }

  getFilteredMenus() {
    return _.filter(this.dela.menus, (menu:any) => {
      return this.isFilteredZone(menu.zoneId) && this.isFilteredCalorie(this.delaService.classify(menu.cal));
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
    return false;
  }

  fold() {
    this.folder.toggle();
  }
}
