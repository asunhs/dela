import { Pipe, PipeTransform } from '@angular/core';
import { DelaService } from './dela.service';

const CAL_LABEL = {
  'super-high': '초고칼로리',
  'high': '높은칼로리',
  'normal': '표준칼로리',
  'low': '낮은칼로리',
  'super-low': '초저칼로리'
};

@Pipe({
  name: 'calories'
})
export class CaloriesPipe implements PipeTransform {

  constructor(private delaService:DelaService) { }

  transform(value: string, args?: any): string {

    let classified = this.delaService.classify(value);

    switch (args) {
      case "name": return CAL_LABEL[classified];
      default: return classified;
    }
  }

}
