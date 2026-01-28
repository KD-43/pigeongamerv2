import { Fragment, useEffect }from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/Home_page';
import SpecificDeal from './pages/SpecificDeal_page';
import SearchResults from './pages/SearchResults_page';
import Watchlists from './pages/Watchlists_page';
import SingleWatchlistPage from './pages/SingleWatchlist_page';
import ViewMoreDeals from './pages/ViewMoreDeals_page';
import ErrorPage from './pages/404_page';
import { Routes, Route, useLocation, matchPath } from 'react-router';
import ScrollToTop from './components/util/scrollToTop';

const routes = [
  { path: '/', title: 'Home', component: HomePage },
  { path: '/deals/details/:dealId', title: 'Specific Deal', component: SpecificDeal },
  { path: '/deals/view-more/:dealsType', title: 'View More', component: ViewMoreDeals },
  { path: '/search/:query', title: 'Search Results', component: SearchResults },
  { path: '/watchlists', title: 'Current Watchlists', component: Watchlists },
  { path: '/watchlists/:watchlistId', title: 'Watchlist', component: SingleWatchlistPage },
  { path: '*', title: 'Error', component: ErrorPage },
];

const findRoute = (fallback = "PigeonGamer") => {
  const { pathname } = useLocation();

  useEffect(() => {
    for (const r of routes) {
      const match = matchPath({ path: r.path, end: true }, pathname);

      if (match) {
        const title = r.title;
        document.title = `PigeonGamer | ${title}`;
        return;
      }
    }

    document.title = fallback;
  }, [ pathname, fallback ]);
};

const App = () => {
  findRoute();

  return (
    <Fragment>
      <CssBaseline />
        <ScrollToTop />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}
        </Routes>
    </Fragment>
  );
};

export default App;