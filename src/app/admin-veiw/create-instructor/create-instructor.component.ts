import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { instructor } from 'src/app/interfaces/instructor';
import { InstructorService } from 'src/app/services/instructor.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-instructor',
  templateUrl: './create-instructor.component.html',
  styleUrls: ['./create-instructor.component.css']
})
export class CreateInstructorComponent implements OnInit {
  instructorFormGroup!: FormGroup;
  credentialsFormGroup!: FormGroup;
  msg = '';
  isEditMode: boolean = false;
  InstructorId: string = '';
  submitted=false
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private instructorService: InstructorService,
    private route :ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.instructorFormGroup = this._formBuilder.group({
      name: ['', [Validators.required, this.nameValidator]],
      email: ['', [Validators.required, Validators.email]],
      bio: ['', [Validators.required]],
      reviewIns: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      specialization: ['', [Validators.required]],
      linkedin: ['', [Validators.required]],
      twitter: ['', [Validators.required]],
      location: ['', [Validators.required]],
      experience: ['', [Validators.required]]
    });

    this.credentialsFormGroup = this._formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );

    this.route.paramMap.subscribe(params => {
      this.InstructorId = params.get('id')!;
      console.log(this.InstructorId)
      if (this.InstructorId) {
        this.isEditMode = true;
        this.loadData();
        console.log(this.isEditMode)
      }
    });
  } 

  loadData(): void {
    if (this.InstructorId) {
      this.instructorService.getOne(this.InstructorId).subscribe((instructor: instructor) => {
        console.log(instructor); 
        this.instructorFormGroup.patchValue({
          name: instructor.name,
          email: instructor.email,
          bio: instructor.bio,
          reviewIns: instructor.reviewIns,
          experience:instructor.experience,
          specialization: instructor.specialization,
          linkedin: instructor.socialLinks.linkedin,
          twitter: instructor.socialLinks.twitter,
          location: instructor.location,
        });

        this.credentialsFormGroup.patchValue({
          username: instructor.username
        });

      }, (error) => {
        this.msg = 'Instructor data not found!';
        console.error('Error fetching instructor:', error);
      });
    }
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

  nameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    const hasNumbers = /\d/.test(value); 
    return hasNumbers ? { 'noNumbers': true } : null;
  }
  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    if (form.get('password')?.value !== form.get('confirmPassword')?.value) {
      return { mismatch: true };
    } 
    return null;
  }

  submitForm(): void {
   
      this.submitted=true
      const newInstructor: instructor = {
        instructorId: '', 
        name: this.instructorFormGroup.value.name,
        email: this.instructorFormGroup.value.email,
        bio: this.instructorFormGroup.value.bio,
        reviewIns: this.instructorFormGroup.value.reviewIns,
        image: 'assets/instructor.jpeg',
        experience:this.instructorFormGroup.value.experience,
        specialization: this.instructorFormGroup.value.specialization,
        socialLinks: {
          linkedin: this.instructorFormGroup.value.linkedin,
          twitter: this.instructorFormGroup.value.twitter
        },
        location: this.instructorFormGroup.value.location,
        username: this.credentialsFormGroup.value.username,
        password: this.credentialsFormGroup.value.password,
        role:'Instructor',
        isFirstLogin:true,
        ownRegistered:false
      };

      const updateInstructor = {
        instructorId: '', 
        name: this.instructorFormGroup.value.name,
        email: this.instructorFormGroup.value.email,
        bio: this.instructorFormGroup.value.bio,
        reviewIns: this.instructorFormGroup.value.reviewIns,
        image: 'assets/instructor.jpeg',
        experience:this.instructorFormGroup.value.experience,
        specialization: this.instructorFormGroup.value.specialization,
        socialLinks: {
          linkedin: this.instructorFormGroup.value.linkedin,
          twitter: this.instructorFormGroup.value.twitter
        },
        location: this.instructorFormGroup.value.location,
        username: this.credentialsFormGroup.value.username,
        role:'Instructor',
        isFirstLogin:true,
        ownRegistered:false
      };

      console.log("here",this.isEditMode)
      console.log("here",this.InstructorId)
      if (this.isEditMode) {
        console.log("inside update")
        this.instructorService.updateData(this.InstructorId, updateInstructor).subscribe({
          next: () => {
            alert('Instructor updated successfully!');
            this.router.navigate(['/admin-dashboard']);
          },
          error: (err) => {
            this.msg = 'There was an error updating the Instructor. Please try again later.';
            console.error('Error updating instructor:', err);
          }
        });
      } else {
        if(this.credentialsFormGroup.valid && this.instructorFormGroup.valid){
        this.instructorService.postData(newInstructor).subscribe({
          next: (response) => {
            alert('Instructor created successfully!');
            this.router.navigate(['/admin-dashboard']); 
          },
          error: (err) => {
            this.msg = 'There was an error creating the instructor. Please try again later.';
            console.error('Error creating instructor:', err);
          }
        });
      }
    }
    }
  }
