export interface MovieFilterDto {
  id?: number;
  query?: string;
  genres?: number[];
  language?: string;
  page?: number;
}
