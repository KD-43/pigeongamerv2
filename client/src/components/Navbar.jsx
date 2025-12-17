import * as React from 'react';
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
import { AccountCircle, FormatListBulleted, Notifications, Menu } from '@mui/icons-material';
import Searchbar from './Searchbar';
import PGLogo from '../assets/svg/PG_logo_main.svg?react';
import { Link } from 'react-router';

export default function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleHomeBtn = () => {

  }

  return (
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
                sx={{ mr: 13 }}
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
                sx={{ mr: 2 }}
              >
                <Notifications />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={() => navigate('/watchlists')}
              >
                <FormatListBulleted />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="open drawer"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            
          </Toolbar>
        </AppBar>
    </Box>

  );
}