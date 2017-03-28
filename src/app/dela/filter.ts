import 'reflect-metadata';

import { OpaqueToken } from '@angular/core'

import * as _ from 'lodash';


const FILTER = new OpaqueToken('FILTER');


export class Filter {
  
  items:{[key:string]:string};
  filtered:string[] = [];

  private constructor(items:{[key:string]:string}) {
    this.items = items;
    this.clear();
  }

  clear() {
      _.remove(this.filtered);
      this.filtered = _.keys(this.items);
  }

  isFiltered(key:string):boolean {
    return _.includes(this.filtered, key);
  }

  toggle(key:string) {
    if (this.isFiltered(key)) {
      _.pull(this.filtered, key);
    } else {
      this.filtered.push(key);
    }
    return false;
  }

  hasFiltered(): boolean {
    return _.size(this.filtered) < _.size(this.items);
  }

  static getFilter(items:{[key:string]:string}) {
    return new Filter(items);
  }

  static create(items:{[key:string]:string}) {
    return function (target:any, name:string) {
      target[name] = Filter.getFilter(items);

      let filters:string[] = Reflect.hasMetadata(FILTER, target) ? Reflect.getMetadata(FILTER, target) : [];
      filters.push(name);
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