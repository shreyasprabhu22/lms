import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private userservice: UsersService
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.userForm.controls; }

  redirectToNewPage() {
    this.router.navigate(['/mycourses']);
  }

  func() {
    this.router.navigate(['/signup']);
  }

  onSubmit() {
    this.submitted = true;

    const { username, password } = this.userForm.value;

    const user = this.userservice.authenticateUser(username, password);

    if (user) {
      alert("Login successful")
      this.redirectToNewPage();
    } else {
      alert( 'Invalid username or password. Please try again.');
    }
  }
}
