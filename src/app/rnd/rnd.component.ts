import { Inject, Component, ViewChild } from '@angular/core';
import { Filter, Filtered } from '../dela/filter';
import { DelaService, PlaceService, CALORIES } from '../dela/dela.service';
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
  menus: any[];
  opened: boolean;
  time: string;


  @Filter.create({ B:'Cafe 1', A:'Cafe 2' })
  zoneFilter: Filter;

  @Filter.create(CALORIES)
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
    placeService.getMenus().subscribe(dela => {
      this.menus = this.parse(dela.menus);
      this.opened = dela.opened;
      this.time = dela.date;
    });
  }

  parse(menus:any[]) {
    return _.forEach(menus, p => {
      _.forEach(p, menu => {
        menu["ko"] = menu.title;
        menu["en"] = menu.menu.join(" ");
        menu["zoneName"] = menu.zoneId == "A" ? "Cafe 2" : "Cafe 1";
      })
    });
  }

  getFilteredMenus() {
    return _.filter(this.menus[this.meal], (menu:any) => {
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
