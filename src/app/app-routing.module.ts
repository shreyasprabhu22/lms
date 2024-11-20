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
import { InstructorPageComponent } from './instructors/instructor-page/instructor-page.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminDashboardComponent } from './admin-veiw/admin-dashboard/admin-dashboard.component';
import { CreateBlogComponent } from './admin-veiw/create-blog/create-blog.component';
import { CreateInstructorComponent } from './admin-veiw/create-instructor/create-instructor.component';
import { InstructorDashboardComponent } from './instructor-view/instructor-dashboard/instructor-dashboard.component';
import { AddCourseComponent } from './instructor-view/add-course/add-course.component';
import { InstructorViewGuard } from './auth/instructor-view.guard';
import { UserGuard } from './auth/user.guard';
import { VeiwBlogComponent } from './blogs/veiw-blog/veiw-blog.component';
import { VeiwCourseComponent } from './my-courses/veiw-course/veiw-course.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
const routes: Routes = [{path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'contact', component:ContactUsComponent},
  {path:'login',component:LoginComponent},
  {path:'courses',component:AllCoursesComponent},
  {path:'aboutus',component:AboutUsComponent},
  {path:'signup',component:SigninComponent},
  {path:'blogs', component:BlogPageComponent},
  {path:'mycourses', component:MyCoursesComponent, canActivate:[UserGuard]},
  {path:'cart',component:CartComponent},
  {path:'instructor',component:InstructorPageComponent},
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-instructor',
    component: CreateInstructorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-instructor/:id',
    component: CreateInstructorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-blog',
    component: CreateBlogComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'create-course',
    component:AddCourseComponent,
    canActivate:[InstructorViewGuard]
  },
  {
    path:'instructor-dashboard',
    component : InstructorDashboardComponent,
    canActivate:[InstructorViewGuard]
  },
  {
    path:'view-blog/:id',
    component : VeiwBlogComponent
  },
  {
    path:'view-course/:id',
    component : VeiwCourseComponent
  },
  {
    path:'forgot-password',
    component : ForgotPasswordComponent
  },
  {
    path:'reset-password',
    component : ForgotPasswordComponent
  },
  { path: 'update-blog/:id', component: CreateBlogComponent ,canActivate: [AuthGuard]},

  { path: 'update-course/:id', component: AddCourseComponent, canActivate:[InstructorViewGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
