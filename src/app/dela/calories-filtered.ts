import * as _ from 'lodash';

export class CaloriesFiltered {
  calorieClasses = ['super-high', 'high', 'normal', 'low', 'super-low'];

  isFilteredCalorie(calorieClass) {
    return _.includes(this.calorieClasses, calorieClass);
  }

  toggleCalorieFilter(calorieClass) {
    if (this.isFilteredCalorie(calorieClass)) {
      _.pull(this.calorieClasses, calorieClass);
    } else {
      this.calorieClasses.push(calorieClass);
    }
    return false;
  }
}
