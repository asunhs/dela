import { Component } from '@angular/core';
import { DelaService } from '../dela/dela.service';

@Component({
  selector: 'dela-rnd',
  templateUrl: './rnd.component.html',
  styleUrls: ['./rnd.component.scss']
})
export class RndComponent {
  
  meal:number = 1;
  dela: any = {
    menus: []
  };

  constructor(private delaService:DelaService) {
    this.getMenus().then(dela => this.dela = dela);
  }

  getMenus(): Promise<any> {
    return this.delaService.getRnd();
  }
}
