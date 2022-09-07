export interface Movie {
  id: number;
  backdrop_path: string;
  poster_path?: string;
  title?: string;
  name?: string;
  original_name?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  media_type?: string;
  videos: {
    results: { key: string }[];
  };
}
