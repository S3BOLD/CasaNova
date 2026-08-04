import { useState } from 'react';
import TopNav from './components/TopNav.jsx';
import HomePage from './pages/HomePage.jsx';
import GiftsPage from './pages/GiftsPage.jsx';
import ReferencesPage from './pages/ReferencesPage.jsx';

const TABS = [
  { key: 'home', label: 'Início' },
  { key: 'gifts', label: 'Presentes' },
  { key: 'references', label: 'Referências' },
];

export default function App() {
  const [tab, setTab] = useState('home');

  return (
    <>
      <TopNav tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'home' && <HomePage onGoToGifts={() => setTab('gifts')} />}
      {tab === 'gifts' && <GiftsPage />}
      {tab === 'references' && <ReferencesPage />}

      <footer className="app-footer">feito com carinho para a casa nova</footer>
    </>
  );
}
