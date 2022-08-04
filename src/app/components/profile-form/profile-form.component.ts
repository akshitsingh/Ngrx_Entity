import { validation_messages } from './../../validators/validator_message';
import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomValidators } from 'src/app/validators/custom.validator';

// describes what the return value of the form control will look like
export interface ProfileFormValues {
  name: string;
  email: string;
  password: number;
}

/**Profile form reusable component */
@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    }
  ]
})
export class ProfileFormComponent implements ControlValueAccessor, OnDestroy {
  validation_messages = validation_messages;
  profileForm: FormGroup;
  subscriptions: Subscription[] = [];

  get value(): ProfileFormValues {
    return this.profileForm.value;
  }

  set value(value: ProfileFormValues) {
    this.profileForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }


  /**Get email control */
  get emailControl() {
    return this.profileForm.controls.email;
  }
  
  constructor(private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      password : ['',[Validators.required,Validators.minLength(8),CustomValidators.passwordStrengthValidator]],
      confirmPassword : ['',[Validators.required]],
      // confirmPassword : ['',Validators.required]
    },
    {
      validator : CustomValidators.mustMatch('password', 'confirmPassword') // password must match with confirmpassword;
    }
    );

    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.profileForm.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.profileForm.reset();
    }
  }

   registerOnTouched(fn) {
    this.onTouched = fn;
  }

    // communicate the inner form validation to the parent form
    validate(_: FormControl) {
      return this.profileForm.valid ? null : { profile: { valid: false } };
    }

}
