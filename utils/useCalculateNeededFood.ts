import useCalculateAgeInYears from './useCalculateAgeInYears'
import type { Animal } from '~/types'

export default (animal: Animal): number => {
  if (animal.species === 'fish') {
    return 0;
  }

  let foodRequirement = (animal.height + animal.weight) / 250;

  const age = useCalculateAgeInYears(animal.birthdate);

  if (age > 20) {
    foodRequirement /= 2;
  } else if (age < 2) {
    foodRequirement *= 2;
  }

  if (animal.favouriteFruit === 'cherry') {
    foodRequirement += 28;
  }

  if (animal.gender === 'male') {
    foodRequirement *= 1.2;
  }

  return Math.ceil(foodRequirement * 30);
}