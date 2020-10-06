import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MovieService } from '../src/modules/movie/movie.service';
const all = require('./movies/all.json');
const mulan = require('./movies/mulan.json');
const fantasy = require('./movies/fantasy.json');

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let movieService = {
    findAll: () => {
      return JSON.stringify(all);
    },
    findByName: () => {
      return JSON.stringify(mulan);
    },
    findByGenre: () => {
      return JSON.stringify(fantasy);
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MovieService)
      .useValue(movieService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/GET Movies without params', async () => {
  //   const response = await request(app.getHttpServer())
  //     .get('/movies')
  //     .expect(200);
  //   // console.log('response.body', JSON.parse(response.text));
  //   // expect(response.body).toEqual(movieService.findAll());
  //   expect(JSON.stringify(JSON.parse(response.text))).toEqual(
  //     movieService.findAll(),
  //   );
  // });
  it('/GET Movies with genre param', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies?query=mulan')
      .expect(200);
    expect(JSON.stringify(JSON.parse(response.text))).toEqual(
      movieService.findByName(),
    );
  });

  // it('/GET Movies with genre param', async () => {
  //   const response = await request(app.getHttpServer())
  //     .get('/movies?genre=14')
  //     .expect(200);
  //   expect(JSON.stringify(JSON.parse(response.text))).toEqual(
  //     movieService.findByGenre(),
  //   );
  // });
  // it('/GET Movies with genre and name param', async () => {
  //   const response = await request(app.getHttpServer())
  //     .get('/movies?name=mulan&genre=14')
  //     .expect(200);
  //   console.log('response.body', response.body);
  //   // expect(response.body).toEqual(movieService.findByGenre());
  // });

  afterEach(async () => {
    await app.close();
  });
});
