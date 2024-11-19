import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userForm: FormGroup;
  submitted = false;
  errorMessage = '';
  selectedOption: string = 'user';
  
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private loginservice:LoginService
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.selectedOption === 'user') {
      this.loginservice.loginUser(this.userForm.value.username, this.userForm.value.password).subscribe(
        (response) => {
          this.loginservice.setCurrentUser(response.user);  
          this.loginservice.setRole(response.user.role);
          console.log(response)
          console.log(this.loginservice.get_role())
          alert('Login successful');
          if(this.loginservice.get_role()==='Admin'){
          this.router.navigate(['/admin-dashboard'])
          }
          if(this.loginservice.get_role()==='User'){
            this.router.navigate(['/mycourses'])
            }
        },
        (error) => {
          alert('Login failed');
        }
      );
    } else if (this.selectedOption === 'instructor') {
      this.loginservice.loginInstructor(this.userForm.value.username, this.userForm.value.password).subscribe(
        (response) => {
          this.loginservice.setCurrentUser(response.user);
          this.loginservice.setRole('Instructor');
          alert('Login successful');
          this.router.navigate(['/instructor-dashboard'])
        },
        (error) => {
          alert('Incorrect username or password');
        }
      );
    }
  }

  func1(){
    this.router.navigate(['/forgot-password']
    );
  }
  func2(){
    this.router.navigate(['/signup'])
  } 

}
