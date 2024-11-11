import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ContactUsComponent } from './contactUs/contact-us/contact-us.component';
import { LoginComponent } from './login/login/login.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { AboutUsComponent } from './about-us/about-us/about-us.component';
import { SigninComponent } from './signin/signin.component';
import { BlogPageComponent } from './blogs/blog-page/blog-page.component';
import { MyCoursesComponent } from './my-courses/my-courses/my-courses.component';
 import { CartComponent } from './all-courses/cart/cart.component';

const routes: Routes = [{path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'contact', component:ContactUsComponent},
  {path:'login',component:LoginComponent},
  {path:'courses',component:AllCoursesComponent},
  {path:'aboutus',component:AboutUsComponent},
  {path:'signup',component:SigninComponent},
  {path:'blogs', component:BlogPageComponent},
  {path:'mycourses', component:MyCoursesComponent},
  {path:'cart',component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
