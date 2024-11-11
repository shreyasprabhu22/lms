import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../services/users.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  personalFormGroup!: FormGroup;
  educationFormGroup!: FormGroup;
  credentialsFormGroup!: FormGroup;
  msg = '';

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.personalFormGroup = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.educationFormGroup = this._formBuilder.group({
      degree: ['', [Validators.required]],
      university: ['', [Validators.required]]
    });

    this.credentialsFormGroup = this._formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    return valid ? null : { passwordStrength: true };
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    if (form.get('password')?.value !== form.get('confirmPassword')?.value) {
      return { mismatch: true };
    }
    return null;
  }

  submitForm(): void {
    if (this.personalFormGroup.valid && this.educationFormGroup.valid && this.credentialsFormGroup.valid) {

      const newUser: User = {
        id: '',
        userid: '',
        firstName: this.personalFormGroup.value.firstName,
        lastName: this.personalFormGroup.value.lastName,
        email: this.personalFormGroup.value.email,
        degree: this.educationFormGroup.value.degree,
        university: this.educationFormGroup.value.university,
        username: this.credentialsFormGroup.value.username,
        password: this.credentialsFormGroup.value.password,
        subscription: 'free',
        CoursesTaken: []
      };

      this.usersService.createUser(newUser).subscribe({
        next: (response) => {
          alert('User created successfully!');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.msg = 'There was an error creating the user. Please try again later.';
          console.error('Error creating user:', err);
        }
      });
    } else {
      this.msg = 'Please fill out all fields correctly.';
    }
  }
}
