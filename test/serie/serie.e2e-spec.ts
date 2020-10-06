import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const all = require('./all.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const supernatural = require('./supernatural.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const drama = require('./drama.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const supernaturalAndDrama = require('./supernatural-and-drama.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const supernatural1622 = require('./supernatural-1622.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const popular = require('./popular.json');

describe('SerieController (e2e)', () => {
  let app: INestApplication;
  let token;
  const movieMockService = {
    findAll: () => JSON.stringify(all),
    findByName: () => JSON.stringify(supernatural),
    findByGenre: () => JSON.stringify(drama),
    findByNameAndGenre: () => JSON.stringify(supernaturalAndDrama),
    findById: () => JSON.stringify(supernatural1622),
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

  it('/GET Series without params', async () => {
    const response = await request(app.getHttpServer())
      .get('/series')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findAll(),
    );
  });
  it('/GET Series with name param', async () => {
    const response = await request(app.getHttpServer())
      .get('/series?query=supernatural')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findByName(),
    );
  });

  it('/GET Series with genre param', async () => {
    const response = await request(app.getHttpServer())
      .get('/series?genre=18')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findByGenre(),
    );
  });
  it('/GET Series with genre and name param', async () => {
    const response = await request(app.getHttpServer())
      .get('/series?query=supernatural&genre=18')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findByNameAndGenre(),
    );
  });

  it('/GET Series by id', async () => {
    const response = await request(app.getHttpServer())
      .get('/series/1622/detail')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findById(),
    );
  });

  it('/GET Popular series', async () => {
    const response = await request(app.getHttpServer())
      .get('/series/popular')
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
