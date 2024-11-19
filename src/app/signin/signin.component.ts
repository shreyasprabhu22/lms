import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/userInterface';

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
  availableInterests: string[] = [
    'Artificial Intelligence',
    'Machine Learning',
    'Cybersecurity',
    'Cloud Computing',
    'Web Development',
    'Data Science',
    'Blockchain'
  ];
  

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.personalFormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, ]],
      dateofBirth: ['', [Validators.required]],
      gender :['', [Validators.required]]
    });

    this.educationFormGroup = this._formBuilder.group({
      currentInstitution: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      interests: ['', [Validators.required]],
      location: ['', [Validators.required]]
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
        userId: '',
        name: this.personalFormGroup.value.name,
        email: this.personalFormGroup.value.email,
        username: this.credentialsFormGroup.value.username,
        password: this.credentialsFormGroup.value.password,
        profilePhoto:'assets/user.png',
        phoneNumber:this.personalFormGroup.value.phoneNumber,
        currentInstitution: this.educationFormGroup.value.currentInstitution,
        gender : this.personalFormGroup.value.gender,
        role:'User',
        dateOfBirth:this.personalFormGroup.value.dateOfBirth,
        enrollmentDate:new Date(),
        bio:this.educationFormGroup.value.bio,
        interests:this.educationFormGroup.value.interests ,
        location:this.educationFormGroup.value.location,
        subscription: 'free',
        purchasedCourses: []
      };

      this.userService.postData(newUser).subscribe({
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
