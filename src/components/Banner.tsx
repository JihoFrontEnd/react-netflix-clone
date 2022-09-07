import { useEffect, useState } from 'react';
import styled from 'styled-components';
import requests from '../api/request';
import { $fetch } from '../api/tmdb';
import { Movie } from '../types/Movie';

import './Banner.scss';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default function Banner() {
  const [movie, setMovie] = useState<Movie>({
    id: -1,
    backdrop_path: '',
    overview: '',
    videos: { results: [] },
  });
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  const fetchRandomMovie = async () => {
    return $fetch(requests.fetchNowPlaying)
      .then((data) => data.results[Math.floor(Math.random() * data.results.length)].id)
      .then((id) => $fetch(`/movie/${id}`, { append_to_response: 'videos' }))
      .then((data) => setMovie(data));
  };

  const truncate = (str: string, offset: number) => {
    return str.length > offset ? str?.substr(0, offset - 1) + '...' : str;
  };

  return isClicked ? (
    <Container>
      <HomeContainer>
        <Iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; fullscreen;"
          allowFullScreen
        ></Iframe>
      </HomeContainer>
    </Container>
  ) : (
    <header
      className="banner"
      style={
        movie.backdrop_path
          ? {
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
              backgroundPosition: 'top center',
              backgroundSize: 'cover',
            }
          : {}
      }
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie.title || movie.name || movie.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button play" onClick={() => setIsClicked(true)}>
            Play
          </button>
          <button className="banner__button info">More Information</button>
        </div>
        <h2 className="banner__description">{truncate(movie.overview, 100)}</h2>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
}
