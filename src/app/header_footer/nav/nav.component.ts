import { Component, Input } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Input() customColor: string="";
  isLoggedIn :any= false;
  role:any=""

  constructor(private router:Router, private loginservice:LoginService) {}
  
  ngOnInit(): void {
    this.isLoggedIn = this.loginservice.currentUser !== null;
    this.role = this.loginservice.role;
    console.log('isLoggedIn:', this.isLoggedIn);
    console.log('role:', this.role);
  }
  
  
  logout() {
    this.loginservice.logout();
    this.router.navigate(['/home']);
  }
  
}
 