import { Inject, Component, ViewChild } from '@angular/core';
import { Filter, Filtered } from '../dela/filter';
import { DelaService, PlaceService, CAL_LEVEL } from '../dela/dela.service';
import { FolderDirective } from '../dela/folder.directive';

import * as _ from 'lodash';


function TestDeco(options) {
  return function (target) {
    // console.log(target, options);
  }
}

function MethodDeco(target, key:string, des: PropertyDescriptor) {
  // console.log(target);
  // console.log(key);
  // console.log(des);
}



@Component({
  selector: 'dela-jamsil',
  templateUrl: './jamsil.component.html',
  styleUrls: ['./jamsil.component.scss'],
  providers: [
    PlaceService,
    { provide: 'API_URL', useValue: "https://dela-mini.firebaseio.com/delacourt/jamsil.json" }
  ]
})
export class JamsilComponent extends Filtered {
  
  dela: any = {};

  @Filter.create(['B1','B2'])
  zoneFilter:Filter;

  @Filter.create(CAL_LEVEL)
  calorieFilter:Filter;

  @ViewChild(FolderDirective)
  private folder;

  constructor(
    placeService:PlaceService,
    private delaService:DelaService
  ) {
    super();
    this.clear();
    placeService.getMenus().subscribe(dela => this.dela = dela);
  }

  getFilteredMenus() {
    return _.filter(this.dela.menus, (menu:any) => {
      return this.zoneFilter.isFiltered(menu.zoneId) && this.calorieFilter.isFiltered(this.delaService.classify(menu.cal));
    });
  }

  fold() {
    this.folder.toggle();
  }
}
