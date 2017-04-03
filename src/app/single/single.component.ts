import { OnInit, Inject, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filter, Filtered } from '../dela/filter';
import { DelaService, CALORIES } from '../dela/dela.service';

import * as _ from 'lodash';

@Component({
  selector: 'dela-single',
  templateUrl: './single.component.html'
})
export class SingleComponent extends Filtered {
  
  menus: any[];
  opened: boolean;
  time: string;
  source: string;

  @Filter.create(CALORIES)
  calorieFilter:Filter;

  constructor(
    private delaService:DelaService,
    route: ActivatedRoute
  ) {
    super();
    route.url.subscribe(([{path}]) => {
      this.init(path);
    });
  }

  init(path:string) {
    this.clear();
    this.source = this.delaService.getSource(path);
    this.delaService.getMenusFrom(path).subscribe(dela => {
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
