import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { $fetch } from '../../api/tmdb';
import { Movie } from '../../types/Movie';

export default function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    $fetch(`/movie/${movieId}`).then(setMovie);
  }, [movieId]);

  return movie && movie.id ? (
    <section>
      {JSON.stringify(movie)}
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={`${movie.backdrop_path}`}
      />
    </section>
  ) : (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p style={{ fontSize: '2rem', color: 'oldlace' }}>loading...</p>
    </div>
  );
}
