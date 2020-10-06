import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
const all = require('./all.json');
const supernatural = require('./supernatural.json');
const drama = require('./drama.json');
const supernaturalAndDrama = require('./supernatural-and-drama.json');
const supernatural1622 = require('./supernatural-1622.json');
const popular = require('./popular.json');

describe('SerieController (e2e)', () => {
  let app: INestApplication;
  let movieMockService = {
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
    })
      // .overrideProvider(MovieService)
      // .useValue(movieService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET Series without params', async () => {
    const response = await request(app.getHttpServer())
      .get('/series')
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findAll(),
    );
  });
  it('/GET Series with name param', async () => {
    const response = await request(app.getHttpServer())
      .get('/series?query=supernatural')
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findByName(),
    );
  });

  it('/GET Series with genre param', async () => {
    const response = await request(app.getHttpServer())
      .get('/series?genre=18')
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findByGenre(),
    );
  });
  it('/GET Series with genre and name param', async () => {
    const response = await request(app.getHttpServer())
      .get('/series?query=supernatural&genre=18')
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findByNameAndGenre(),
    );
  });

  it('/GET Series by id', async () => {
    const response = await request(app.getHttpServer())
      .get('/series/1622/detail')
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findById(),
    );
  });

  it('/GET Popular series', async () => {
    const response = await request(app.getHttpServer())
      .get('/series/popular')
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findPopular(),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
