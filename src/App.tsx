import { Outlet, Route, Routes } from 'react-router-dom';
import Footer from './layouts/Footer';
import Nav from './layouts/Nav';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';

const Layout = () => (
  <div>
    <Nav />
    <Outlet />
    <Footer />
  </div>
);

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
