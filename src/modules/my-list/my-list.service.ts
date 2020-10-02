import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MyList } from './schemas/my-list.schema';
import { MovieDetailDto } from '../movie/dtos/movie-detail.dto';
import { SerieDetailDto } from '../serie/dtos/serie-detail.dto';
import { Movie } from '../movie/schemas/movie.schema';
import { Serie } from '../serie/schemas/serie.schema';
import { plainToClass } from 'class-transformer';
import { MyListDto } from './dtos/my-list.dto';

@Injectable()
export class MyListService {
  constructor(@InjectModel('list') private _myListModel: Model<MyList>) {}

  async findAll(email: string) {
    const theList = await this._myListModel.findOne({ email });
    const toReturn = await theList
      .populate('movies')
      .populate('series')
      .execPopulate();
    const theListDto = new MyListDto();
    theListDto.email = theList.email;
    theListDto.movies = toReturn.movies.map(m =>
      plainToClass(MovieDetailDto, m),
    );
    theListDto.series = toReturn.series.map(s =>
      plainToClass(SerieDetailDto, s),
    );
    return theListDto;
  }

  async add(
    email: string,
    theEntertaiment: Movie | Serie,
    isMovie: boolean,
  ): Promise<boolean> {
    let myList = await this._myListModel.findOne({ email });
    if (!myList) {
      myList = new this._myListModel({
        email,
        movies: [],
        series: [],
      });
    }
    if (isMovie) return this.addMovie(myList, theEntertaiment);
    return this.addSerie(myList, theEntertaiment);
  }

  async remove(
    email: string,
    theEntertaiment: Movie | Serie,
    isMovie: boolean,
  ): Promise<boolean> {
    const myList = await this._myListModel.findOne({ email });
    if (!myList) throw new NotFoundException('my_list_not_found');
    if (isMovie) return this.removeMovie(myList, theEntertaiment);
    return this.removeSerie(myList, theEntertaiment);
  }

  private async addMovie(theList: MyList, theMovie) {
    if (!theList.movies.includes(theMovie._id.toString())) {
      theList.movies.push(theMovie);
      await theList.save();
    }
    return true;
  }
  private async removeMovie(theList: MyList, theMovie) {
    console.log('La lista', theList);
    console.log('La pelicula', theMovie);
    const newMovies = theList.movies.filter(
      movie => movie != theMovie._id.toString(),
    );
    theList.movies = newMovies;
    await theList.save();
    return true;
  }
  private async addSerie(theList: MyList, theSerie) {
    if (!theList.series.includes(theSerie._id.toString())) {
      theList.series.push(theSerie);
      await theList.save();
    }
    return true;
  }

  private async removeSerie(theList: MyList, theSerie) {
    const newSeries = theList.series.filter(
      serie => serie != theSerie._id.toString(),
    );
    theList.series = newSeries;
    await theList.save();
    return true;
  }
}
