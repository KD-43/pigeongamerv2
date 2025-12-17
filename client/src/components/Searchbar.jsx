import { useState, } from 'react';
import { useNavigate } from 'react-router';
import { useSearchForDeals } from '../hooks/deals/useSearchForDeals';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';

const Search = styled('div')(({ theme, bgColor, width }) => ({
  position: 'relative',
  borderRadius: '56px',
  backgroundColor: bgColor ? bgColor : theme.palette.background.default,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
  },
  marginLeft: 0,
  width: width,
  // [theme.breakpoints.up('sm')]: {
  //   marginLeft: theme.spacing(1),
  //   width: 'auto',
  // },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#0b0b0c',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
    // [theme.breakpoints.up('sm')]: {
    //   width: '12ch',
    //   '&:focus': {
    //     width: '20ch',
    //   },
    // },
  },
}));

export default function Searchbar({ bgColor, width }) {

  const [ searchTerm, setSearchTerm ] = useState('');
  const navigate = useNavigate();

  const handleClick = (e) => {
    // e.preventDefault();
    const queryString = String(searchTerm);
    const trimmed = queryString.trim();
    if (!trimmed) return;

    const encoded = encodeURIComponent(trimmed);
    navigate(`/search/${encoded}`);
  };

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
        handleClick();
        e.preventDefault();
    }
  };

  return (
    <Search bgColor={bgColor} width={width}>
      <SearchIconWrapper>
          <SearchIcon sx={{  }}/>
      </SearchIconWrapper>
      <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onKeyDown={handleSearchEnter}
          onChange={(e) => setSearchTerm(e.target.value)} 
          value={searchTerm}
      />
    </Search>
  );
}