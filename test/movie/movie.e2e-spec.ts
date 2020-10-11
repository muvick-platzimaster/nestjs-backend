import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const all = require('./all.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mulan = require('./mulan.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fantasy = require('./fantasy.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mulanAndFantasy = require('./mulan-and-fantasy.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mulan337401 = require('./mulan-337401.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const popular = require('./popular.json');

describe('MovieController (e2e)', () => {
  let app: INestApplication;
  let token;
  const movieMockService = {
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

  it('/GET Movies without params', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findAll(),
    );
  });
  it('/GET Movies with name param', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies?query=mulan')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findByName(),
    );
  });

  it('/GET Movies with genre param', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies?genre=14')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findByGenre(),
    );
  });
  it('/GET Movies with genre and name param', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies?query=mulan&genre=14')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findByNameAndGenre(),
    );
  });

  it('/GET Movies by id', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies/337401/detail')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findById(),
    );
  });

  it('/GET Popular movies', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies/popular')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findPopular(),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
