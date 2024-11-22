import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './sharedmaterial/sharedmaterial.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Correct import

import { courseReducer } from './all-courses/store/course.reducer';
import { CourseEffects } from './all-courses/store/course.effects';

import { EmailService } from './services/email.service';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { CartService } from './services/cart.service';
import { InstructorService } from './services/instructor.service';
import { BlogService } from './services/blog.service';
import { OtherService } from './services/other.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './header_footer/nav/nav.component';
import { FooterComponent } from './header_footer/footer/footer.component';
import { HeaderComponent } from './header_footer/header/header.component';
import { HomeComponent } from './home/home/home.component';
import { CounterComponent } from './home/counter/counter.component';
import { LmsDetailsComponent } from './home/lms-details/lms-details.component';
import { FeatureCardComponent } from './home/feature-card/feature-card.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { CourseCardComponent } from './home/course-card/course-card.component';
import { PriceCardComponent } from './home/price-card/price-card.component';
import { BlogContainerComponent } from './home/blog-container/blog-container.component';
import { LoginComponent } from './login/login/login.component';
import { ContactUsComponent } from './contactUs/contact-us/contact-us.component';
import { ContactFormComponent } from './contactUs/contact-form/contact-form.component';
import { ContactDetailsComponent } from './contactUs/contact-details/contact-details.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { AboutUsComponent } from './about-us/about-us/about-us.component';
import { AccordianComponent } from './about-us/accordian/accordian.component';
import { CategoryConatinerComponent } from './about-us/category-conatiner/category-conatiner.component';
import { SigninComponent } from './signin/signin.component';
import { BlogPageComponent } from './blogs/blog-page/blog-page.component';
import { BlogComponentComponent } from './blogs/blog-component/blog-component.component';
import { MyCoursesComponent } from './my-courses/my-courses/my-courses.component';
import { PricingPageComponent } from './pricing/pricing-page/pricing-page.component';
import { CartComponent } from './all-courses/cart/cart.component';
import { InstructorPageComponent } from './instructors/instructor-page/instructor-page.component';
import { InstructorContainerComponent } from './instructors/instructor-container/instructor-container.component';
import { AdminDashboardComponent } from './admin-veiw/admin-dashboard/admin-dashboard.component';
import { CreateInstructorComponent } from './admin-veiw/create-instructor/create-instructor.component';
import { CreateBlogComponent } from './admin-veiw/create-blog/create-blog.component';
import { BlogManagementComponent } from './admin-veiw/blog-management/blog-management.component';
import { UserManagementComponent } from './admin-veiw/user-management/user-management.component';
import { InstructorManagementComponent } from './admin-veiw/instructor-management/instructor-management.component';
import { InstructorDashboardComponent } from './instructor-view/instructor-dashboard/instructor-dashboard.component';
import { AddCourseComponent } from './instructor-view/add-course/add-course.component';
import { VeiwCourseComponent } from './my-courses/veiw-course/veiw-course.component';
import { VeiwBlogComponent } from './blogs/veiw-blog/veiw-blog.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { NgChartsModule } from 'ng2-charts';
import { NotFoundComponent } from './not-found/not-found.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GraphsComponent } from './admin-veiw/graphs/graphs.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    CounterComponent,
    LmsDetailsComponent,
    FeatureCardComponent,
    CarouselComponent,
    CourseCardComponent,
    PriceCardComponent,
    BlogContainerComponent,
    LoginComponent,
    ContactUsComponent,
    ContactFormComponent,
    ContactDetailsComponent,
    AllCoursesComponent,
    AboutUsComponent,
    AccordianComponent,
    CategoryConatinerComponent,
    SigninComponent,
    BlogPageComponent,
    BlogComponentComponent,
    MyCoursesComponent,
    PricingPageComponent,
    CartComponent,
    InstructorPageComponent,
    InstructorContainerComponent,
    AdminDashboardComponent,
    CreateInstructorComponent,
    CreateBlogComponent,
    BlogManagementComponent,
    UserManagementComponent,
    InstructorManagementComponent,
    InstructorDashboardComponent,
    AddCourseComponent,
    VeiwCourseComponent,
    VeiwBlogComponent,
    ForgotPasswordComponent,
    GraphsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,  
    NgChartsModule,
    StoreModule.forRoot({ course: courseReducer }),
    EffectsModule.forRoot([CourseEffects]),
   
  ],
  providers: [
    EmailService,
    LoginService,
    UserService,
    CartService,
    InstructorService,
    BlogService,
    OtherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
