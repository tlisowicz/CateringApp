import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function positiveIntValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const num = Number.parseInt(control.value);
        return (num > 0 && !isNaN(num))  ?  null : { NotValidInt : { value: control.value } };
    };
}

export function positiveFloatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const num = Number.parseFloat(control.value);
        return (num > 0 && !isNaN(num))  ?  null : { NotValidFloat : { value: control.value } };
    };
}

export function stringValidator(rgx: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valid = rgx.test(control.value);

        return (valid)  ?  null : { NotValidString : { value: control.value } };
    };
}

export class PasswordValidators {
    constructor() {}
  
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
          // if the control value is empty return no error.
          return null;
        }
  
        // test the value of the control against the regexp supplied.
        const valid = regex.test(control.value);
  
        // if true, return no error, otherwise return the error object passed in the second parameter.
        return valid ? null : error;
      };
    }

    static matchValidator(
        matchTo: string, 
        reverse?: boolean
      ): ValidatorFn {
        return (control: AbstractControl): 
        ValidationErrors | null => {
          if (control.parent && reverse) {
            const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
            if (c) {
              c.updateValueAndValidity();
            }
            return null;
          }
          return !!control.parent &&
            !!control.parent.value &&
            control.value === 
            (control.parent?.controls as any)[matchTo].value
            ? null
            : { matching: true };
        };
      }
  }


