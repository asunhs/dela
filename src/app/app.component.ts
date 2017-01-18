import { Component } from '@angular/core';
import { DelaService } from './dela/dela.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dela-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  
  dela: any = {};

  constructor(private delaService:DelaService) {
    this.getMenus().then(dela => this.dela = dela);
  }

  getMenus(): Promise<any> {
    return this.delaService.getMenus();
  }
}
