import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
const movies = require('./movies.json');
const series = require('./series.json');

describe('GenreController (e2e)', () => {
  let app: INestApplication;
  let movieMockService = {
    findFromMovies: () => JSON.stringify(movies),
    findFromSeries: () => JSON.stringify(series),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // .overrideProvider(MovieService)
      // .useValue(movieService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET Genres from movies', async () => {
    const response = await request(app.getHttpServer())
      .get('/genre/movies')
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findFromMovies(),
    );
  });
  it('/GET Genres from series', async () => {
    const response = await request(app.getHttpServer())
      .get('/genre/series')
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findFromSeries(),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
