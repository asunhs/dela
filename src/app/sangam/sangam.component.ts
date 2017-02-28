import { Inject, Component } from '@angular/core';
import { Filter, CaloriesFiltered } from '../dela/filter';
import { DelaService, PlaceService } from '../dela/dela.service';

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
export class SangamComponent extends CaloriesFiltered {
  
  dela: any = {};

  constructor(
    placeService:PlaceService,
    private delaService:DelaService
  ) {
    super();
    this.clear();
    placeService.getMenus().subscribe(dela => this.dela = dela);
  }

  clear() {
    this.calorieFilter.clear();
  }

  hasFiltered(): boolean {
    return this.calorieFilter.hasFiltered();
  }

  getFilteredMenus() {
    return _.filter(this.dela.menus, (menu:any) => {
      return this.calorieFilter.isFiltered(this.delaService.classify(menu.cal));
    });
  }
}
