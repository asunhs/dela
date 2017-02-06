import { Component } from '@angular/core';
import { DelaService } from './dela/dela.service';

@Component({
  selector: 'dela-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private loading: boolean;

  constructor(delaService:DelaService) {
    delaService.loading.subscribe(loading => this.loading = loading)
  }

  isLoading() {
    return this.loading;
  }
}
