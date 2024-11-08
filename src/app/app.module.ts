import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MaterialModule} from './sharedmaterial/sharedmaterial.module'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
