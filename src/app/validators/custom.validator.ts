import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms"

export class CustomValidators {
  constructor() {}

 static passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {

  let value: string = control.value || '';
  let msg = "";
  if (!value) {
    return null
  }

  let upperCaseCharacters = /[A-Z]+/g;
  let lowerCaseCharacters = /[a-z]+/g;
  let numberCharacters = /[0-9]+/g;
  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (upperCaseCharacters.test(value) === false || lowerCaseCharacters.test(value) === false || numberCharacters.test(value) === false || specialCharacters.test(value) === false) {
    return {
      passwordStrength: 'Password must contain at least two of the following: numbers, lowercase letters, uppercase letters, or special characters.'
    }

  }
}

/**Password must match validation */
static mustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    // set error on matchingControl if validation fails
    control.value !== matchingControl.value ?  matchingControl.setErrors({ mustMatch: true })
    : matchingControl.setErrors(null);
  };
}
}