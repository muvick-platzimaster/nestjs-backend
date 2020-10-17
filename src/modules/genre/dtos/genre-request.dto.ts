import { IsString, IsIn, IsOptional } from 'class-validator';

export class GenreRequestDto {
  @IsString()
  @IsIn(['es'])
  @IsOptional()
  language?: string;
}
