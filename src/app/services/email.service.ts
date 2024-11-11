import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private userId = 'r7p1wfOXMJfWdo2rW';  
  private serviceId = 'service_6q4f7xn';  
  private templateId = 'template_yzdz1ku'; 

  constructor() { }

  sendEmail(templateParams: any): Promise<any> {
    const emailParams = {
      service_id: this.serviceId,
      template_id: this.templateId,
      user_id: this.userId,
      template_params: templateParams
    };

    return emailjs.send(
      emailParams.service_id, 
      emailParams.template_id, 
      emailParams.template_params, 
      emailParams.user_id
    );
  }
}
