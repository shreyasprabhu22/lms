import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/userInterface';
import { UserService } from 'src/app/services/user.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({ 
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  emailForm: FormGroup;
  passwordForm: FormGroup;
  step: number = 1; 
  userExists: boolean=false;
  user: User | null = null;
  selectedOption: string = 'user'; 
  reset:boolean=false
  

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private instructorservice:InstructorService,
    private route:ActivatedRoute,
    private loginservice:LoginService
  ) {
    
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
        confirmPassword: ['', [Validators.required]]
      },
      { validator: this.passwordMatchValidator }
    );
    const currentRoute = this.router.url;
    if(currentRoute.includes('/reset-password')){
          this.reset=true,
          this.step=2
    }
  }

  passwordMatchValidator(form: FormGroup): null | object {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmitEmail(): void {
    const email = this.emailForm.value.email;
    if(this.selectedOption==='user'){
      console.log("inside user email")
      this.userService.checkUserByEmail(this.emailForm.value.email).subscribe(
      (response) => {
        if (response.exists) {
          this.userExists = true;
          this.step=2;
        } else {
          this.userExists = false;
          alert("not a valid user email")
        }
      },
      (error) => {
        console.error(error);
      }
    );
    }
    else{
      this.instructorservice.getInstructorByEmail(this.emailForm.value.email).subscribe(
      (response) => {
        if (response.exists) {
          this.userExists = true;
          this.step=2;
        } else {
          this.userExists = false;
          alert("not a valid instructor email")
        }
      },
      (error) => {
        console.error(error);
      }
    );
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
  onSubmitPassword(): void {
    if(this.reset){
      
        const data={
          password:this.passwordForm.value.password,
          isFirstLogin:false
      }
      console.log(this.loginservice.get_currentUser().instructorId)
      this.instructorservice.updateData(this.loginservice.get_currentUser().instructorId, data).subscribe(
        (response) => {
          alert("password updated")
          this.router.navigate(['/instructor-dashboard'])
        },
        (error) => {
          console.log(error)
          alert(error)
        }  
      );

      
      }

    else{
      if(this.selectedOption==='user'){
        this.userService.updatePassword(this.emailForm.value.email,this.passwordForm.value.password).subscribe(
          (response) => {
            alert("password updated")
            this.router.navigate(['/login'])
          },
          (error) => {
            console.log(error)
            alert(error)
          }
        );
      }
      else{
        console.log(this.passwordForm.value.password)
        this.instructorservice.updatePassword(this.emailForm.value.email,this.passwordForm.value.password).subscribe(
        (response) => {
          alert("password updated")
          this.router.navigate(['/login'])
        },
        (error) => {
          console.log(error)
          alert(error)
        }
      );
      }
    }
  }
}
