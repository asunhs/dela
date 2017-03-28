import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({
  name: 'entry'
})
export class EntryPipe implements PipeTransform {

  transform(value: {[key:string]:any}, args?: any): any[] {
    return _(value).keys().map(key => {
      return { key, value: value[key] };
    }).value();
  }

}
