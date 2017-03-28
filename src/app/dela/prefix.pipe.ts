import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefix'
})
export class PrefixPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    if (!isNaN(+value)) {
      return "b_" + value;
    }

    return value;
  }

}
