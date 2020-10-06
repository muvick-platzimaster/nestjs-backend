import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
const myList = require('./my-list.json');
const myNewMovieList = require('./my-list-remove-movie.json');
const myNewSerieList = require('./my-list-remove-serie.json');

describe('MyListController (e2e)', () => {
  let app: INestApplication;
  let movieMockService = {
    findMyList: () => JSON.stringify(myList),
    findWithMovieRemove: () => JSON.stringify(myNewMovieList),
    findWithSerieRemove: () => JSON.stringify(myNewSerieList),
  };
  let token;

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

  it('/GET My List', async () => {
    const response = await request(app.getHttpServer())
      .get('/my-lists')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findMyList(),
    );
  });
  it('/DELETE Remove movie (539885) from my list', async () => {
    const response = await request(app.getHttpServer())
      .delete('/movies/539885')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findWithMovieRemove(),
    );
  });
  it('/POST Add movie (539885) from my list', async () => {
    const response = await request(app.getHttpServer())
      .post('/movies/539885')
      .set('Authorization', 'Bearer ' + token)
      .expect(201);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findMyList(),
    );
  });
  it('/DELETE Remove serie (85723) from my list', async () => {
    const response = await request(app.getHttpServer())
      .delete('/series/85723')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findWithSerieRemove(),
    );
  });
  it('/POST Add serie (85723) from my list', async () => {
    const response = await request(app.getHttpServer())
      .post('/series/85723')
      .set('Authorization', 'Bearer ' + token)
      .expect(201);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieMockService.findMyList(),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
