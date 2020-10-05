import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieResponseDto } from './dtos/movie-response.dto';

describe('MovieController', () => {
  let movieController: MovieController;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [MovieService],
    }).compile();

    movieController = module.get<MovieController>(MovieController);
    movieService = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(movieController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const result = new MovieResponseDto();
      jest
        .spyOn(movieService, 'findAll')
        .mockImplementation(async () => result);

      expect(await movieController.getAll()).toBe(result);
    });
  });
});
