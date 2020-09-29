import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { ConfigEnum } from '../config/config.keys';
import sgMail = require('@sendgrid/mail');
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class UtilService {
  constructor(private configService: ConfigService) {
  }

  insertRequestHeaders () {
    const jwtToken = this.configService.get(ConfigEnum.TMDB_API_KEY_V4_AUTH)
    return {Authorization: `Bearer ${jwtToken}`}
  }

  async sendVerificationEmail (emailData: SendEmailDto) {
    sgMail.setApiKey(this.configService.get(ConfigEnum.SENDGRID_API_KEY))
    const msg = {
      to: emailData.email, // Change to your recipient
      from: 'me@axelespinosadev.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    try {
      const sent = await sgMail.send(msg)
      return sent[0].statusCode === 202;
    } catch (err) {
      console.error(err)
    }
  }
}

