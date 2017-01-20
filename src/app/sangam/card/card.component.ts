import { Component } from '@angular/core';

@Component({
  selector: 'dela-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  inputs: ['menu']
})
export class CardComponent {
  menu: any;
}
