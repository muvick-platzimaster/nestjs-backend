import { HistoryService } from './history.service';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { HistoryModelMock } from './mocks/HistoryModelMock';
import { SerieModelMock } from './mocks/SerieModelMock';
import { MovieModelMock } from './mocks/MovieModelMock';

describe('HistoryService', () => {
  let service: HistoryService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a record', async function() {
    const payload = {
      email: 'test@test.com',
      contentId: '5f788e242f312468317b5485',
      contentType: 'movies',
    };

    await service.add(payload);
  });
});
