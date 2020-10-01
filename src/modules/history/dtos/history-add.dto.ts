import { IsAlpha, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HistoryAddDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  contentId: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  contentType: string
}
