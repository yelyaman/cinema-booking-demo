import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum KinopoiskStatus {
  ANNOUNCED = 'announced',
  COMPLETED = 'completed',
  FILMING = 'filming',
  POST_PRODUCTION = 'post-production',
  PRE_PRODUCTION = 'pre-production',
}

export enum KinopoiskSortFields {
  RATING_IMDB = 'externalId.imdb',
  RATING_KP = 'rating.kp',
  NAME = 'name',
  EN_NAME = 'enName',
  CREATED_AT = 'createdAt',
}

export enum KinopoiskMovieType {
  MOVIE = 'movie',
  EXLUDE_MOVIE = '!movie',
  TV_SERIES = 'tv_series',
  EXLUDE_TV_SERIES = '!tv_series',
  CARTOON = 'cartoon',
  EXLUDE_CARTOON = '!cartoon',
  ANIMATED_SERIES = 'animated_series',
  EXLUDE_ANIMATED_SERIES = '!animated_series',
  ANIME = 'anime',
  EXLUDE_ANIME = '!anime',
}

export class KinopoiskGetAllParams {
  @IsNumber()
  @IsOptional()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsEnum(KinopoiskSortFields, { each: true })
  sortField: KinopoiskSortFields[];

  @IsOptional()
  @IsEnum(KinopoiskMovieType, { each: true })
  type: KinopoiskMovieType[];

  @IsOptional()
  @IsEnum(KinopoiskStatus, { each: true })
  status: KinopoiskStatus[];

  @IsOptional()
  @IsString({ each: true })
  year: string[];
}

export class KinopoiskGetByNameParams {
  @IsNumber()
  @IsOptional()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsString()
  @IsOptional()
  name: string;
}
