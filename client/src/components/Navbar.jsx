import { useState } from 'react';
import { useNavigate } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { AccountCircle, Info, Notifications, CollectionsBookmark, ArrowRight } from '@mui/icons-material';
import Searchbar from './Searchbar';
import PGLogo from '../assets/svg/PG_logo_main.svg?react';
import { Link } from 'react-router';
import SimpleModal from './util/simpleTemplateModalComponent';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';

export default function Navbar({ }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  
  const handleModalOpen = () => {
      setIsModalOpen(true);
  }

  const handleModalClose = () => {
      setIsModalOpen(false);
  }

  const RenderMessage = () => {
    return (
      <Box>
        <Typography>

          <Typography sx={{ mb: 2, }}>This app helps you discover the best game deals and track price changes over time, powered by real-time data from the CheapShark API.</Typography>

          <Typography sx={{ mb: 2, }}>
            <Typography variant="h6" fontWeight={'900'} color="secondary.main">How It Works</Typography>
            No account or login required.
            To keep things simple and privacy-friendly, this project uses a UUIDv4 generated on your first visit instead of traditional authentication. This allows you to create and manage watchlists without storing personal information.
          </Typography>

          <Typography sx={{ mb: 2, }}>
            <Typography variant="h6" fontWeight={'900'} color="secondary.main">Powered by CheapShark</Typography>
            All pricing, discounts, and search results come directly from the CheapShark API, which aggregates deals across multiple digital storefronts to surface the best available prices. All deals can be accessed via redirect performed by CheapShark.
          </Typography>

          <Typography sx={{ mb: 2, }}>
            <Typography variant="h6" fontWeight={'900'} color="secondary.main">Smart Caching (30-Minute Refresh)</Typography>
            To ensure reliability and avoid third-party rate limiting, deal data is cached for up to 30 minutes.
            Watchlist prices and “best deals” are refreshed on this interval, meaning updates may not appear instantly but always reflect the most recent available data.
          </Typography>

          <Typography sx={{ mb: 2, }}>
            <Typography variant="h6" fontWeight={'900'} color="secondary.main">Search & Discover</Typography>
            Use the search bar to quickly find titles and compare deals across stores. Results prioritize the best available discounts at the time of your search.
          </Typography>

          <Box>
            <Typography variant="h6" fontWeight={'900'} color="secondary.main">
              Watchlists & Pricing
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon><ArrowRight /></ListItemIcon>
                <ListItemText primary="Create up to 10 watchlists per user" />
              </ListItem>
              <ListItem>
                <ListItemIcon><ArrowRight /></ListItemIcon>
                <ListItemText primary="Each watchlist can hold up to 100 titles" />
              </ListItem>
              <ListItem>
                <ListItemIcon><ArrowRight /></ListItemIcon>
                <ListItemText primary="Add games to track price changes and discounts" />
              </ListItem>
              <ListItem>
                <ListItemIcon><ArrowRight /></ListItemIcon>
                <ListItemText primary="Best deals are refreshed every 30 minutes using cached data" />
              </ListItem>
              <ListItem>
                <ListItemIcon><ArrowRight /></ListItemIcon>
                <ListItemText primary="Pricing data is powered by the CheapShark API" />
              </ListItem>
            </List>
          </Box>

          <Typography  sx={{ mb: 2, }}>
            <Typography variant="h6" fontWeight={'900'} color="secondary.main">A Note on Data</Typography>
            Prices and deal availability depend on third-party storefronts. If a deal changes or disappears, the app reflects the latest information provided by CheapShark.
          </Typography>

          <Typography>Enjoy exploring deals and building your watchlists — and feel free to dive right in!</Typography>
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <SimpleModal 
          isOpen={isModalOpen}
          onClose={handleModalClose}
          content = {{ title: 'Welcome to PigeonGamer!', body: <RenderMessage />, abort: 'CLOSE', }}
          styles={{ titleSize: '2rem', }}
          onSubmit={false}
          formId = 'simple-modal-form'
          // children={}
          maxWidth='md'
      />
      <Box sx={{ flexGrow: 1, }}>
        <AppBar position="static" sx={{ backgroundColor: theme.palette.tertiary.main, borderRadius: '40px', boxShadow: '0' }}>
          <Toolbar sx={{ justifyContent: 'space-between'}}>
            <Searchbar />
            <Box>
              <IconButton
                component={Link}
                size="large"
                edge="start"
                color="primary"
                aria-label="Home Button"
                sx={{ mr: 11, padding: 1, }} //mr: 13
                to="/"
              >
                <img src={PGLogo} width={36} height={36} />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="open drawer"
                sx={{ mr: 2, padding: 1, }}
                onClick={() => handleModalOpen()}
              >
                <Info />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="open drawer"
                sx={{ mr: 2, padding: 1, }}
                disabled
              >
                <Notifications />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="open drawer"
                sx={{ mr: 2, padding: 1, }}
                onClick={() => navigate('/watchlists')}
              >
                <CollectionsBookmark />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="open drawer"
                sx={{ padding: 1, }}
                disabled
              >
                <AccountCircle />
              </IconButton>
            </Box>
      
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}