import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { ConfigEnum } from '../config/config.keys';

@Injectable()
export class UtilsService {
  constructor(private configService: ConfigService) {
  }

  insertRequestHeaders () {
    const jwtToken = this.configService.get(ConfigEnum.TMDB_API_KEY_V4_AUTH)
    return {Authorization: `Bearer ${jwtToken}`}
  }
}

