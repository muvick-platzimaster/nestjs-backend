import { HistoryService } from './history.service';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Documents
import { History } from './schema/history.schema';
import { Movie } from '../movie/schemas/movie.schema';
import { Serie } from '../serie/schemas/serie.schema';
// Mocks
import { SerieModelMock } from './mocks/serie-model-mock.service';
import { MovieModelMock } from './mocks/movie-model-mock.service';
import { HistoryModelMock } from './mocks/history-model-mock.service';
import sinon = require('sinon');

const payloadMockNotExist = {
  email: 'test@test.com',
  contentId: '5f788e242f312468317b5485',
  contentType: 'movie',
};

const movieMock = {
  _id: '5f788e242f312468317b5485',
  genres: [
    { id: 28, name: 'Action' },
    { id: 53, name: 'Thriller' },
  ],
  id: 724989,
  // eslint-disable-next-line @typescript-eslint/camelcase
  backdrop_path: '/86L8wqGMDbwURPni2t7FQ0nDjsH.jpg',
  // eslint-disable-next-line @typescript-eslint/camelcase
  poster_path: '/ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg',
  // eslint-disable-next-line @typescript-eslint/camelcase
  original_language: 'en',
  title: 'Hard Kill',
  // eslint-disable-next-line @typescript-eslint/camelcase
  original_title: 'Hard Kill',
  overview:
    'The work of billionaire tech CEO Donovan Chalmers is so valuable that he hires mercenaries to protect it, and a terrorist group kidnaps his daughter just to get it.',
  popularity: 882.969,
  // eslint-disable-next-line @typescript-eslint/camelcase
  release_date: '2020-08-25',
  runtime: 98,
  // eslint-disable-next-line @typescript-eslint/camelcase
  vote_average: 5,
  __v: 0,
};

describe('HistoryService', () => {
  let service: HistoryService;
  let historyModel: Model<History>;
  let movieModel: Model<Movie>;
  let serieModel: Model<Serie>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        HistoryService,
        {
          provide: getModelToken('history'),
          useValue: HistoryModelMock,
        },
        {
          provide: getModelToken('serie'),
          useValue: SerieModelMock,
        },
        {
          provide: getModelToken('movie'),
          useValue: MovieModelMock,
        },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
    historyModel = module.get<Model<History>>(getModelToken('history'));
    movieModel = module.get<Model<Movie>>(getModelToken('movie'));
    serieModel = module.get<Model<Serie>>(getModelToken('serie'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a movie to the history', async function() {
    const historyFindOne = sinon
      .stub(historyModel, 'findOne')
      .withArgs({ email: payloadMockNotExist.email })
      .resolves(null);
    const movieFindOne = sinon
      .stub(movieModel, 'findOne')
      .withArgs({ _id: payloadMockNotExist.contentId })
      .resolves(movieMock);

    const addMovie = await service.add(payloadMockNotExist);
    expect(
      historyFindOne.calledWith({ email: payloadMockNotExist.email }),
    ).toBe(true);
    expect(
      movieFindOne.calledWith({ _id: payloadMockNotExist.contentId }),
    ).toBe(true);
    expect(movieFindOne.calledOnce).toBe(true);
    expect(addMovie).toBe(true);
  });
});
