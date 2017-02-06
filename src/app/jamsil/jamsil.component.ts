import { Inject, Component, ViewChild } from '@angular/core';
import { CaloriesFiltered } from '../dela/calories-filtered';
import { DelaService, API_URL } from '../dela/dela.service';
import { FolderDirective } from '../dela/folder.directive';

import * as _ from 'lodash';

@Component({
  selector: 'dela-jamsil',
  templateUrl: './jamsil.component.html',
  styleUrls: ['./jamsil.component.scss'],
  providers: [
    { provide: API_URL, useValue: "https://dela-mini.firebaseio.com/delacourt/jamsil.json" }
  ]
})
export class JamsilComponent extends CaloriesFiltered {
  
  dela: any = {};
  zoneIds;

  @ViewChild(FolderDirective)
  private folder;

  constructor(
    private delaService:DelaService,
    @Inject(API_URL) url: string) {
    super();
    this.init();
    delaService.getMenus(url).subscribe(dela => this.dela = dela);
  }

  init() {
    super.init();
    this.zoneIds = ['B1','B2'];
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

  isFiltered(): boolean {
    return (_.size(this.zoneIds) < 2) || super.isFiltered();
  }

  fold() {
    this.folder.toggle();
  }
}
