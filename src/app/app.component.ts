import { Component } from '@angular/core';
import { DelaService } from './dela/dela.service';

@Component({
  selector: 'dela-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private delaService:DelaService) { }

  isLoading() {
    return this.delaService.isLoading();
  }
}
