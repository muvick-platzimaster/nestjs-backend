import { Test, TestingModule } from '@nestjs/testing';
import { MyListController } from './my-list.controller';

describe('MyListController', () => {
  let controller: MyListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyListController],
    }).compile();

    controller = module.get<MyListController>(MyListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
