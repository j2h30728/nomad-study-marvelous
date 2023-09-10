export interface Response<T> {
  results: T;
  count: number;
  limit: number;
  total: number;
  offset: number;
}

export interface Character {
  id: number;
  name: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  series: {
    available: number;
    items: Array<Items>;
  };
  stories: {
    available: number;
    items: Array<Items>;
  };
  urls: Array<Url>;
}
export type Items = { name: string; resourceURI: string };
export type Url = { type: string; url: string };
