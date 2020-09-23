import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  private url: string = 'https://api.themoviedb.com';

  constructor(private httpService: HttpService) {
  }

  list() {
    return [{ data: [] }];
  }
}
