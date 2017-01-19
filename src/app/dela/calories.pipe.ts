import { Pipe, PipeTransform } from '@angular/core';


const CAL_LEVEL = {
        'SUPER_HIGH': 'super-high',
        'HIGH': 'high',
        'NORMAL': 'normal',
        'LOW': 'low',
        'SUPER_LOW': 'super-low'
    },
    CAL_LABEL = {
        'super-high': '초고칼로리',
        'high': '높은칼로리',
        'normal': '표준칼로리',
        'low': '낮은칼로리',
        'super-low': '초저칼로리'
    };

function numberify(str:string): number {
    return parseInt(str.replace(/\D/g, ''));
}

@Pipe({
  name: 'calories'
})
export class CaloriesPipe implements PipeTransform {

  transform(value: number, args?: any): string {

    let classified = this.classify(value);

    switch (args) {
      case "name": return CAL_LABEL[classified];
      default: return classified;
    }
  }


  classify(calories: number): string {

    if (calories > 900) {
        return CAL_LEVEL.SUPER_HIGH;
    } else if (calories > 850) {
        return CAL_LEVEL.HIGH;
    } else if (calories < 600) {
        return CAL_LEVEL.SUPER_LOW;
    } else if (calories < 650) {
        return CAL_LEVEL.LOW;
    } else {
        return CAL_LEVEL.NORMAL;
    }
  }

}
