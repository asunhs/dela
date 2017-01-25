import { Pipe, PipeTransform } from '@angular/core';
import { DelaService } from './dela.service';

const matcher = /[^\d\.]/g;

@Pipe({
  name: 'toNumber'
})
export class ToNumberPipe implements PipeTransform {

  constructor(private delaService:DelaService) { }

  transform(value: string, args?: any): number {
    return this.delaService.toNumber(value);
  }

}
