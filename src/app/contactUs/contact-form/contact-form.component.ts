import { Component } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
import { AbstractControl, ValidatorFn,FormControl  } from '@angular/forms';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
   
  nameInvalid: boolean = false;

  constructor(private emailService: EmailService) {}

  nameValidation(value: string): boolean {
    const hasNumbers = /\d/.test(value); 
    this.nameInvalid = hasNumbers;  
    return hasNumbers;
  }

  onSubmit(contactForm: any) {
    if (contactForm.valid) {
      const name = contactForm.value.name;
      const email = contactForm.value.email;
      const message = "You have received a new message from a user: " + contactForm.value.message;

      const templateParams = {
        from_name: name,
        from_email: email,
        message: message
      };

      this.emailService.sendEmail(templateParams).then(
        (response) => {
          console.log('Email sent successfully:', response);
          alert('Thank you! Your message has been sent.');
        },
        (error) => {
          console.error('Error sending email:', error);
          alert('Oops! Something went wrong, please try again.');
        }
      );
    } else {
      alert('Please fill out the form correctly!');
    }
  }
 
 
}