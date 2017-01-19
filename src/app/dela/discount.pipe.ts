import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: number, args?: any): number {
    
    if (value == 5500) {
        return 2500;
    }
    return value - 2500;
  }

}
