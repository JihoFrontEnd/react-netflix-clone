import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.scss';

export default function Nav() {
  const [isBlack, setIsBlack] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('scroll', () => setIsBlack(window.scrollY > 50));
    return () => window.removeEventListener('scroll', () => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(() => e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <nav className={`${isBlack && 'nav__black'}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/400px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
        className="nav__logo"
        onClick={() => window.location.reload()}
      />

      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        placeholder="영화를 검색해 주세요."
      />

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
        alt="User Avartar"
        className="nav__avatar"
      />
    </nav>
  );
}
