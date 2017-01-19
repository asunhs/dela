import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meal'
})
export class MealPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    switch (value) {
      case 0: return "아침";
      case 1: return "점심";
      case 2: return "저녁";
      default: return "";
    }
  }

}
