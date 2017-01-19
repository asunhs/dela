import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'unescape'
})
export class UnescapePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return !!value && _.unescape(value);
  }

}
