import { Component } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {

  constructor(private emailService: EmailService) {}

    onSubmit(contactForm:any) {

      
      const name=contactForm.value.name;
      const email = contactForm.value.email;
      const  message= "You have received a new message from a user"+ contactForm.value.message

      
      const templateParams = {
        from_name: contactForm.value.name,
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
    alert("form submitted")
 }
}
