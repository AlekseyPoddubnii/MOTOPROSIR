import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const match = formGroup.controls[matchName];

        if (match.errors && !match.errors.mustMatch) {
            return;
        }

        if (control.value !== match.value) {
            match.setErrors({ mustMatch: true });
        } else {
            match.setErrors(null);
        }
    };
}
