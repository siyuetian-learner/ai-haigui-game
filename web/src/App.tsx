import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';
import Guide from './pages/Guide';
import NotFound from './pages/NotFound';
import WelcomePage from './components/WelcomePage';

export default function App() {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/';

  if (isWelcomePage) {
    return <WelcomePage />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
