import { Pipe, PipeTransform } from '@angular/core';

const FULLNAME = {
  "B": 'Cafeteria 1',
  "A": 'Cafeteria 2'
};
const SHORTNAME = {
  "B": 'Cafe 1',
  "A": 'Cafe 2'
};


@Pipe({
  name: 'cafe'
})
export class CafePipe implements PipeTransform {

  transform(value: string, args?: string): string {

    switch (args) {
      case "fullname": return FULLNAME[value];
      default: return SHORTNAME[value];
    }
  }

}
