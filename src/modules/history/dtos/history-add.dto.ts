import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HistoryAddDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsMongoId()
  contentId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  contentType: string;
}
