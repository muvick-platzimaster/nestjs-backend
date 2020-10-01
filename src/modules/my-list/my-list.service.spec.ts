import { Test, TestingModule } from '@nestjs/testing';
import { MyListService } from './my-list.service';

describe('MyListService', () => {
  let service: MyListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyListService],
    }).compile();

    service = module.get<MyListService>(MyListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
