import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'dela-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  inputs: ['menu']
})
export class CardComponent implements OnChanges {

  @Input() menu: any;

  constructor() { }

  ngOnChanges(change) {
    console.log(change);
  }

}
