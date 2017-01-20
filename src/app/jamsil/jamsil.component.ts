import { Component } from '@angular/core';
import { DelaService } from '../dela/dela.service';

import * as _ from 'lodash';

@Component({
  selector: 'dela-jamsil',
  templateUrl: './jamsil.component.html',
  styles: []
})
export class JamsilComponent {
  
  dela: any = {};
  filteredCalories: string[] = [];

  constructor(delaService:DelaService) {
    delaService.getJamsil().then(dela => this.dela = dela);
  }

  getMenus(): any {
    return _(this.dela).value();
  }
}
