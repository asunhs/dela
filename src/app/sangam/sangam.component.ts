import { Inject, Component } from '@angular/core';
import { Filter, Filtered } from '../dela/filter';
import { DelaService, PlaceService, CALORIES } from '../dela/dela.service';

import * as _ from 'lodash';

@Component({
  selector: 'dela-jamsil',
  templateUrl: './sangam.component.html',
  styles: [],
  providers: [
    PlaceService,
    { provide: 'API_URL', useValue: "https://dela-mini.firebaseio.com/delacourt/sangam.json" }
  ]
})
export class SangamComponent extends Filtered {
  
  menus: any[];
  opened: boolean;
  time: string;

  @Filter.create(CALORIES)
  calorieFilter:Filter;

  constructor(
    placeService:PlaceService,
    private delaService:DelaService
  ) {
    super()
    this.clear();
    placeService.getMenus().subscribe(dela => {
      this.menus = dela.menus;
      this.opened = dela.opened;
      this.time = dela.time;
    });
  }

  getFilteredMenus() {
    return _.filter(this.menus, (menu:any) => {
      return this.calorieFilter.isFiltered(this.delaService.classify(menu.cal));
    });
  }
}
