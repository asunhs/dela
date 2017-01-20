import { Pipe, PipeTransform } from '@angular/core';

const matcher = /[^\d\.]/g;

@Pipe({
  name: 'toNumber'
})
export class ToNumberPipe implements PipeTransform {

  transform(value: string, args?: any): number {
    return parseInt(value.replace(matcher, ''));
  }

}
