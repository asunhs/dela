import { Inject, Component } from '@angular/core';
import { Filter, Filtered } from '../dela/filter';
import { DelaService, PlaceService, CAL_LEVEL } from '../dela/dela.service';

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
  
  dela: any = {};

  @Filter.create(CAL_LEVEL)
  calorieFilter:Filter;

  constructor(
    placeService:PlaceService,
    private delaService:DelaService
  ) {
    super()
    this.clear();
    placeService.getMenus().subscribe(dela => this.dela = dela);
  }

  getFilteredMenus() {
    return _.filter(this.dela.menus, (menu:any) => {
      return this.calorieFilter.isFiltered(this.delaService.classify(menu.cal));
    });
  }
}
