import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SimpleContainer from './testComponent';
import HomePage from './pages/Home_page';
import SpecificDeal from './pages/SpecificDeal_page';
import SearchResults from './pages/SearchResults_page';
import Watchlists from './pages/Watchlists_page';
import SingleWatchlistPage from './pages/SingleWatchlist_page';
import ErrorPage from './pages/404_page';
import { Routes, Route } from 'react-router';
import ScrollToTop from './components/util/scrollToTop';

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
        {/* <SimpleContainer /> */}
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/deals/details/:dealId'  element={<SpecificDeal />} />
          <Route path='/search/:query' element={<SearchResults />} />
          <Route path='/watchlists' element={<Watchlists />} />
          <Route path='/watchlists/:watchlistId' element={<SingleWatchlistPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
    </React.Fragment>
  )
}

export default App;