import { Component } from '@angular/core';
import { DelaService } from '../dela/dela.service';

@Component({
  selector: 'dela-jamsil',
  templateUrl: './jamsil.component.html',
  styles: []
})
export class JamsilComponent {
  
  dela: any = {};

  constructor(private delaService:DelaService) {
    this.getMenus().then(dela => this.dela = dela);
  }

  getMenus(): Promise<any> {
    return this.delaService.getJamsil();
  }
}
