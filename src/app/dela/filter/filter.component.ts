import { Component, OnInit, Input } from '@angular/core';
import { Filter } from '../filter';

@Component({
  selector: 'dela-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {

  @Input() filter: Filter

  constructor() { }

  ngOnInit() {
  }

}
