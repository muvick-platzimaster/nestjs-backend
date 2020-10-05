import {
  Controller,
  Get,
  Query,
  Param,
  Req,
  UseGuards,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieResponseDto } from './dtos/serie-response.dto';
import {
  ApiQuery,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { SerieDetailDto } from './dtos/serie-detail.dto';
import { AuthGuard } from '@nestjs/passport';
import { MyListDto } from '../my-list/dtos/my-list.dto';
import { SuspendedGuard } from '../auth/guards/suspended.guard';

@ApiTags('The series')
@Controller('series')
export class SerieController {
  constructor(private readonly _serieService: SerieService) {}
  @Get()
  @ApiOperation({ summary: 'Retrieves the series' })
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
      genres: genre ? [parseInt(genre.toString())] : [],
      language,
    });
  }

  @Get(':id/detail')
  @ApiOperation({ summary: 'Retrieves the serie detail' })
  @ApiQuery({ name: 'language', required: false })
  @ApiOkResponse({ type: SerieDetailDto })
  getById(@Param('id') id: number, @Query('language') language?: string) {
    return this._serieService.findById({ id, language });
  }

  @Get('popular')
  @ApiOperation({ summary: 'Retrieves the popular series' })
  @ApiOkResponse({ type: SerieResponseDto })
  getPopular(@Query('language') language?: string): Promise<SerieResponseDto> {
    return this._serieService.findPopular({ language });
  }

  @Get('top-rated')
  @ApiOperation({ summary: 'Retrieves the top rated series' })
  @ApiOkResponse({ type: SerieResponseDto })
  getTopRated(@Query('language') language?: string): Promise<SerieResponseDto> {
    return this._serieService.findTopRated({ language });
  }

  @Post(':serieId')
  @ApiOperation({ summary: 'Add the serie to my list' })
  @ApiOkResponse({ type: MyListDto })
  @UseGuards(AuthGuard('jwt'), SuspendedGuard)
  addMovie(@Param('serieId') serieId: number, @Req() req): Promise<MyListDto> {
    return this._serieService.add(serieId, req.user.email);
  }

  @Delete(':serieId')
  @ApiOperation({ summary: 'Removes the serie from my list' })
  @ApiOkResponse({ type: MyListDto })
  @UseGuards(AuthGuard('jwt'), SuspendedGuard)
  removeMovie(
    @Param('serieId') serieId: number,
    @Req() req,
  ): Promise<MyListDto> {
    return this._serieService.remove(serieId, req.user.email);
  }
}
