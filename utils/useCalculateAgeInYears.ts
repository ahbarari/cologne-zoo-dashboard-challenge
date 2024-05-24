export default (birthdate: Date) => {
  const today = new Date()
  const birthDate = new Date(birthdate)
  const differenceInMilliseconds = today.getTime() - birthDate.getTime()

  const ageInYears = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365));
  
  // only happens if the birthdate is today
  if (ageInYears === 0) {
    return 1;
  }
  
  return ageInYears;

}
