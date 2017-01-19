import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toNumber'
})
export class ToNumberPipe implements PipeTransform {

  transform(value: string, args?: any): number {
    return parseInt(value.replace(/\D/g, ''));
  }

}
