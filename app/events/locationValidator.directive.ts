import { Directive } from '@angular/core';
import { Validator, AbstractControl, FormGroup, NG_VALIDATORS } from '@angular/forms';


@Directive({
    selector: '[validateLocation]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: LocationValidatorDirective, multi: true }
    ]
})
export class LocationValidatorDirective implements Validator {
    
    validate(c: FormGroup): { [key: string]: any; } {

        let addressControl = c.controls['address'];
        let cityControl = c.controls['city'];
        let countryControl = c.controls['country'];
        let onlineUrlControl = (<FormGroup>c.root).controls['onlineUrl'];

        if ((addressControl && addressControl.value && cityControl && cityControl.value &&
            countryControl && countryControl.value) || (onlineUrlControl && onlineUrlControl.value)){
            return null;
        } else {
            return {validateLocation: false};
        }


    }
    registerOnValidatorChange?(fn: () => void): void {
        
    }

}