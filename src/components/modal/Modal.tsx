import { useRef } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { Movie } from '../../types/Movie';
import './Modal.scss';

interface Props {
  movie: Movie;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({
  movie: { backdrop_path, title, overview, name, release_date, first_air_date, vote_average },
  setModalOpen,
}: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => setModalOpen(false));

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={modalRef}>
          <span className="modal-close" onClick={() => setModalOpen(false)}>
            X
          </span>
          <img
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt={title ? title : name}
            className="modal__poster-img"
          />
          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user-perc">100% for you</span>
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점: {vote_average}</p>
            <p className="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
