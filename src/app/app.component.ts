import { Component } from '@angular/core';
import { DelaService, LoadingService } from './dela/dela.service';

@Component({
  selector: 'dela-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private loading: boolean;

  constructor(
    delaService:DelaService,
    loadingService:LoadingService
  ) {
    loadingService.loading.subscribe(loading => this.loading = loading)
  }

  isLoading() {
    return this.loading;
  }
}
