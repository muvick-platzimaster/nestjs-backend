import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const movies = require('./movies.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const series = require('./series.json');

describe('GenreController (e2e)', () => {
  let app: INestApplication;
  let token;
  const movieMockService = {
    findFromMovies: () => {
      return JSON.stringify(movies);
    },
    findFromSeries: () => JSON.stringify(series),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'jonatan.lazo@gmail.com',
        password: 'Admin.1234',
      })
      .expect(201);
    token = response.body.accessToken;
  });

  it('/GET Genres from movies', async () => {
    const response = await request(app.getHttpServer())
      .get('/genre/movies')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findFromMovies(),
    );
  });
  it('/GET Genres from series', async () => {
    const response = await request(app.getHttpServer())
      .get('/genre/series')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findFromSeries(),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
