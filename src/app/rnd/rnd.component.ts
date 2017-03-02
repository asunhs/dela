import { Inject, Component, ViewChild } from '@angular/core';
import { filter, Filter, CaloriesFiltered } from '../dela/filter';
import { DelaService, PlaceService } from '../dela/dela.service';
import { FolderDirective } from '../dela/folder.directive';

import * as _ from 'lodash';

@Component({
  selector: 'dela-rnd',
  templateUrl: './rnd.component.html',
  styleUrls: ['./rnd.component.scss'],
  providers: [
    PlaceService,
    { provide: 'API_URL', useValue: "https://dela-mini.firebaseio.com/delacourt/rnd.json" }
  ]
})
export class RndComponent extends CaloriesFiltered {
  
  meal:number = 1;
  dela: any = {
    menus: []
  };

  @filter(['A','B']) zoneFilter: Filter;

  @ViewChild(FolderDirective)
  private folder;

  constructor(
    placeService:PlaceService,
    private delaService:DelaService
  ) {
    super();
    this.meal = this.now();
    this.clear();
    placeService.getMenus().subscribe(dela => this.dela = dela);
  }

  clear() {
    this.calorieFilter.clear();
    this.zoneFilter.clear();
  }

  getFilteredMenus() {
    return _.filter(this.dela.menus[this.meal], (menu:any) => {
      return this.zoneFilter.isFiltered(menu.zoneId) && this.calorieFilter.isFiltered(this.delaService.classify(menu.cal));
    });
  }

  hasFiltered(): boolean {
    return this.zoneFilter.hasFiltered() || this.calorieFilter.hasFiltered();
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
