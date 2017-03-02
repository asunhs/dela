import 'reflect-metadata';

import { OpaqueToken } from '@angular/core'

import * as _ from 'lodash';


const FILTER = new OpaqueToken('FILTER');


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

  static create(items:(string[] | {})) {
    return function (target:any, key:string) {
      target[key] = Filter.getFilter(<string[]>_.map(items));

      let filters:string[] = Reflect.hasMetadata(FILTER, target) ? Reflect.getMetadata(FILTER, target) : [];
      filters.push(key);
      Reflect.defineMetadata(FILTER, filters, target);
    }
  }

  static clear(target) {
    _.forEach(Reflect.getMetadata(FILTER, target), (name:string) => {
      target[name].clear();
    });
  }

  static hasFiltered(target): boolean {
    return _.some(Reflect.getMetadata(FILTER, target), (name:string) => {
      return target[name].hasFiltered();
    });
  }
}


export class Filtered {
  
  clear() {
    Filter.clear(this);
  }

  hasFiltered(): boolean {
    return Filter.hasFiltered(this);
  }
}