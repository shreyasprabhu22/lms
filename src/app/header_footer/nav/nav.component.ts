import { Component, Input } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Input() customColor: string="";
  currentRoute: string = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router,private userservice:UsersService, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {

    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });

    this.isLoggedIn = !!this.userservice.getCurrentUser();
  }

  
  isRouteActive(route: string): boolean {
    return this.currentRoute === route;
  }

  

  logout(){
    this.router.navigate(['/home']);
  }
}
 