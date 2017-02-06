import { Inject, Component, ViewChild } from '@angular/core';
import { CaloriesFiltered } from '../dela/calories-filtered';
import { DelaService, API_URL } from '../dela/dela.service';
import { FolderDirective } from '../dela/folder.directive';

import * as _ from 'lodash';

@Component({
  selector: 'dela-rnd',
  templateUrl: './rnd.component.html',
  styleUrls: ['./rnd.component.scss'],
  providers: [
    { provide: API_URL, useValue: "https://dela-mini.firebaseio.com/delacourt/rnd.json" }
  ]
})
export class RndComponent extends CaloriesFiltered {
  
  meal:number = 1;
  dela: any = {
    menus: []
  };
  zoneIds;

  @ViewChild(FolderDirective)
  private folder;

  constructor(
    private delaService:DelaService,
    @Inject(API_URL) url: string) {
    super();
    this.init();
    delaService.getMenus(url).subscribe(dela => this.dela = dela);
    this.meal = this.now();
  }

  init() {
    super.init();
    this.zoneIds = ['A','B'];
  }

  getFilteredMenus() {
    return _.filter(this.dela.menus[this.meal], (menu:any) => {
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
  }

  isFiltered(): boolean {
    return (_.size(this.zoneIds) < 2) || super.isFiltered();
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

  fold() {
    this.folder.toggle();
  }
}
