import { Home } from './pages/Home.jsx';
import { Scripture } from './pages/Scripture.jsx';

export function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  if (path === '/scripture') {
    return <Scripture />;
  }

  return <Home />;
}
