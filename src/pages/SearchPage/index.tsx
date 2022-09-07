import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { $fetch } from '../../api/tmdb';
import { useDebounce } from '../../hooks/useDebounce';
import { Movie } from '../../types/Movie';

import './SearchPage.scss';

export default function SearchPage() {
  const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const searchTerm = useQuery().get('q');
  const debouncedSearchTerm = useDebounce(searchTerm || '', 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      $fetch(`/search/multi?include_adult=false&query=${debouncedSearchTerm}`)
        .then(({ results }) => setSearchMovies(results))
        .catch(console.error);
    }
  }, [debouncedSearchTerm]);

  return searchMovies.length > 0 ? (
    <section className="search-container">
      {searchMovies.map((movie) => {
        if (!!movie.backdrop_path && movie.media_type !== 'person') {
          const movieImageURL = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
          return (
            <div key={movie.id} className="movie">
              <div className="movie__column-poster" onClick={() => navigate(`/${movie.id}`)}>
                <img
                  src={movieImageURL}
                  alt={movie.title ? movie.title : movie.name}
                  className="movie__poster"
                />
              </div>
            </div>
          );
        }
        return <span key={movie.id}></span>;
      })}
    </section>
  ) : (
    <section className="no-results">
      <div className="no-results__text">
        <p>찾고자 하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.</p>
      </div>
    </section>
  );
}
