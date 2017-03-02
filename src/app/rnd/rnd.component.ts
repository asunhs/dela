import { Inject, Component, ViewChild } from '@angular/core';
import { Filter, Filtered } from '../dela/filter';
import { DelaService, PlaceService, CAL_LEVEL } from '../dela/dela.service';
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
export class RndComponent extends Filtered {
  
  meal:number = 1;
  dela: any = {
    menus: []
  };

  @Filter.create(['A','B'])
  zoneFilter: Filter;

  @Filter.create(CAL_LEVEL)
  calorieFilter:Filter;

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

  getFilteredMenus() {
    return _.filter(this.dela.menus[this.meal], (menu:any) => {
      return this.zoneFilter.isFiltered(menu.zoneId) && this.calorieFilter.isFiltered(this.delaService.classify(menu.cal));
    });
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
