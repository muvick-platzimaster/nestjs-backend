import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MovieModule } from '../movie.module';
import { MovieService } from '../movie.service';
import { ConfigModule } from '../../../config/config.module';
// import all from './all.json';
const all = require('./all.json'); //with path
describe('Movies', () => {
  let app: INestApplication;
  let movieService = { findAll: () => all };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MovieModule, ConfigModule],
    })
      .overrideProvider(MovieService)
      .useValue(movieService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET movies`, () => {
    console.log('All', all);
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect({
        data: movieService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
