import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
const all = require('./all.json');
const mulan = require('./mulan.json');
const fantasy = require('./fantasy.json');
const mulanAndFantasy = require('./mulan-and-fantasy.json');
const mulan337401 = require('./mulan-337401.json');
const popular = require('./popular.json');

describe('MovieController (e2e)', () => {
  let app: INestApplication;
  let movieMockService = {
    findAll: () => JSON.stringify(all),
    findByName: () => JSON.stringify(mulan),
    findByGenre: () => JSON.stringify(fantasy),
    findByNameAndGenre: () => JSON.stringify(mulanAndFantasy),
    findById: () => JSON.stringify(mulan337401),
    findPopular: () => JSON.stringify(popular),
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

  it('/GET Movies without params', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies')
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findAll(),
    );
  });
  it('/GET Movies with name param', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies?query=mulan')
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findByName(),
    );
  });

  it('/GET Movies with genre param', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies?genre=14')
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findByGenre(),
    );
  });
  it('/GET Movies with genre and name param', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies?query=mulan&genre=14')
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findByNameAndGenre(),
    );
  });

  it('/GET Movies by id', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies/337401/detail')
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findById(),
    );
  });

  it('/GET Popular movies', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies/popular')
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findPopular(),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
