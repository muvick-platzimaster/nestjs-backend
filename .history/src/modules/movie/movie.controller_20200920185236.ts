import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('The movies')
@Controller('movies')
export class MovieController {}
