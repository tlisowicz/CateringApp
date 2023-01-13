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

// export function dateValidator(rgx: RegExp): ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//         const valid = rgx.test(control.value);

//         return (valid)  ?  null : { NotValidString : { value: control.value } };
//     };
// }