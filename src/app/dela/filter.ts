import 'reflect-metadata';
import * as _ from 'lodash';

export class Filter {
  
  items:string[];
  filtered:string[] = [];

  private constructor(items:string[]) {
    this.items = items;
    this.clear();
  }

  clear() {
      _.remove(this.filtered);
      _.forEach(this.items, item => this.filtered.push(item))
  }

  isFiltered(item):boolean {
    return _.includes(this.filtered, item);
  }

  toggle(item:string) {
    if (this.isFiltered(item)) {
      _.pull(this.filtered, item);
    } else {
      this.filtered.push(item);
    }
    return false;
  }

  hasFiltered(): boolean {
    return _.size(this.filtered) < _.size(this.items);
  }

  static getFilter(items:string[]) {
    return new Filter(items);
  }
}


export function filter(items:string[]) {
  return function (target:any, key:string) {
    target[key] = Filter.getFilter(items);
  }
}


export class CaloriesFiltered {
  @filter(['super-high', 'high', 'normal', 'low', 'super-low']) calorieFilter:Filter;
}