import {
  Controller,
  Get,
  Query,
  Param,
  Req,
  UseGuards,
  Post,
  Delete,
} from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieResponseDto } from './dto/serie-response.dto';
import { ApiQuery, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SerieDetailDto } from './dto/serie-detail.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('The series')
@Controller('series')
export class SerieController {
  constructor(private readonly _serieService: SerieService) {}
  @Get()
  @ApiQuery({ name: 'query', required: false })
  @ApiQuery({ name: 'genre', required: false })
  @ApiQuery({ name: 'language', required: false })
  @ApiOkResponse({ type: SerieResponseDto })
  getAll(
    @Query('query') query?: string,
    @Query('genre') genre?: number,
    @Query('language') language?: string,
  ): Promise<SerieResponseDto> {
    return this._serieService.findAll({
      query,
      genres: [genre],
      language,
    });
  }

  @Get(':id/detail')
  @ApiQuery({ name: 'language', required: false })
  @ApiOkResponse({ type: SerieDetailDto })
  getById(@Param('id') id: number, @Query('language') language?: string) {
    return this._serieService.findById({ id, language });
  }

  @Get('popular')
  @ApiOkResponse({ type: SerieResponseDto })
  getPopular(@Query('language') language?: string): Promise<SerieResponseDto> {
    return this._serieService.findPopular({ language });
  }

  @Get('top-rated')
  @ApiOkResponse({ type: SerieResponseDto })
  getTopRated(@Query('language') language?: string): Promise<SerieResponseDto> {
    return this._serieService.findTopRated({ language });
  }

  @Post(':serieId')
  @UseGuards(AuthGuard('jwt'))
  addMovie(@Param('serieId') serieId: number, @Req() req): Promise<boolean> {
    return this._serieService.add(serieId, req.user.email);
  }

  @Delete(':serieId')
  @UseGuards(AuthGuard('jwt'))
  removeMovie(@Param('serieId') serieId: number, @Req() req): Promise<boolean> {
    return this._serieService.remove(serieId, req.user.email);
  }
}
