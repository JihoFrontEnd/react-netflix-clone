import { useEffect, useState } from 'react';
import { $fetch } from '../api/tmdb';
import { Movie } from '../types/Movie';
import Modal from './modal/Modal';

import './Row.scss';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface Props {
  id: string;
  title: string;
  fetchURL: string;
  isLargeRow?: boolean;
}

export default function Row({ id, title, fetchURL, isLargeRow }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();

  useEffect(() => {
    fetchMovies().then((data) => setMovies(() => data.results));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovies = async () => {
    return $fetch(fetchURL);
  };

  const handleClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <Swiper
        className="slider"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        loop={false}
        spaceBetween={20}
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          988: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          635: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <SwiperSlide>
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && 'row__poster--large'}`}
                src={`https://image.tmdb.org/t/p/original${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      {modalOpen && selectedMovie && <Modal movie={selectedMovie} setModalOpen={setModalOpen} />}
    </section>
  );
  // return (
  //   <section className="row">
  //     <h2>{title}</h2>
  //     <div className="slider">
  //       <div
  //         className="slider__arrow--left"
  //         onClick={() => {
  //           const target = document.getElementById(id);
  //           target && (target.scrollLeft -= window.innerWidth - 80);
  //         }}
  //       >
  //         <span className="arrow">&lt;</span>
  //       </div>
  //       <div id={id} className="row__posters">
  //         {movies.map((movie) => (
  //           <img
  //             key={movie.id}
  //             className={`row__poster ${isLargeRow && 'row__poster--large'}`}
  //             src={`https://image.tmdb.org/t/p/original${
  //               isLargeRow ? movie.poster_path : movie.backdrop_path
  //             }`}
  //             alt={movie.name}
  //             onClick={() => handleClick(movie)}
  //           />
  //         ))}
  //       </div>
  //       <div
  //         className="slider__arrow--right"
  //         onClick={() => {
  //           const target = document.getElementById(id);
  //           target && (target.scrollLeft += window.innerWidth - 80);
  //         }}
  //       >
  //         <span className="arrow">&gt;</span>
  //       </div>
  //     </div>

  //     {modalOpen && selectedMovie && <Modal movie={selectedMovie} setModalOpen={setModalOpen} />}
  //   </section>
  // );
}
