import { Inject, Component, ViewChild } from '@angular/core';
import { Filter, CaloriesFiltered } from '../dela/filter';
import { DelaService, PlaceService } from '../dela/dela.service';
import { FolderDirective } from '../dela/folder.directive';

import * as _ from 'lodash';

@Component({
  selector: 'dela-jamsil',
  templateUrl: './jamsil.component.html',
  styleUrls: ['./jamsil.component.scss'],
  providers: [
    PlaceService,
    { provide: 'API_URL', useValue: "https://dela-mini.firebaseio.com/delacourt/jamsil.json" }
  ]
})
export class JamsilComponent extends CaloriesFiltered {
  
  dela: any = {};
  zoneFilter:Filter;

  @ViewChild(FolderDirective)
  private folder;

  constructor(
    placeService:PlaceService,
    private delaService:DelaService
  ) {
    super();
    this.zoneFilter = Filter.getFilter(['B1','B2']);
    this.clear();
    placeService.getMenus().subscribe(dela => this.dela = dela);
  }

  clear() {
    this.calorieFilter.clear();
    this.zoneFilter.clear();
  }

  getFilteredMenus() {
    return _.filter(this.dela.menus, (menu:any) => {
      return this.zoneFilter.isFiltered(menu.zoneId) && this.calorieFilter.isFiltered(this.delaService.classify(menu.cal));
    });
  }

  hasFiltered(): boolean {
    return this.zoneFilter.hasFiltered() || this.calorieFilter.hasFiltered();
  }

  fold() {
    this.folder.toggle();
  }
}
