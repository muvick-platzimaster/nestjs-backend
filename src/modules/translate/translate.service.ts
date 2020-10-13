import { Injectable } from '@nestjs/common';
import LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
import { IamAuthenticator } from 'ibm-watson/auth';
import { ConfigService } from '../../config/config.service';
import { ConfigEnum } from '../../config/config.keys';


@Injectable()
export class TranslateService {
  private translator
  constructor(private _config: ConfigService) {
    this.translator = new LanguageTranslatorV3({
      version: '2018-05-01',
      authenticator: new IamAuthenticator({
        apikey: _config.get(ConfigEnum.API_IBM_TRANSLATOR),
      }),
      serviceUrl: _config.get(ConfigEnum.API_URL_IBM_TRANSLATOR),
    });
  }

  translate (text, language) {
    return true
  }
}
