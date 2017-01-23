import { Component } from '@angular/core';
import { DelaService } from '../dela/dela.service';

@Component({
  selector: 'dela-jamsil',
  templateUrl: './sangam.component.html',
  styles: []
})
export class SangamComponent {
  
  dela: any = {};

  constructor(private delaService:DelaService) {
    delaService.getSangam().then(dela => this.dela = dela);
  }
}
