import { Component, Input } from '@angular/core';

@Component({
  selector: 'dela-card',
  host: {
    class: 'dela-card'
  },
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() menu: any;
  @Input() zone: boolean;
}
