import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box, Button, IconButton, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../auth/AuthSlice';

export const Navbar = () => {
  const loggedInUser = useSelector(selectLoggedInUser);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#3f51b5', zIndex: 1200, boxShadow: '0 1px 1px 0 rgba(0,0,0,.16)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', gap: 4 }}>
        
        {/* Logo */}
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none',
            display: { xs: 'none', sm: 'block' },
            letterSpacing: 1
          }}
        >
          Quickora
          <Box component="span" sx={{ color: '#ffe11b', fontSize: '0.6rem', fontStyle: 'italic', display: 'block', mt: '-5px', fontWeight: 'bold' }}>
            Plus ✨
          </Box>
        </Typography>

        {/* Search Bar */}
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '2px',
            width: '100%',
            maxWidth: '500px',
            px: 2,
            py: 0.5,
        }}>
          <InputBase
            placeholder="Search for products, brands and more"
            sx={{ ml: 1, flex: 1, color: 'black', fontSize: '14px' }}
            inputProps={{ 'aria-label': 'search for products' }}
          />
          <IconButton type="button" sx={{ p: '5px', color: '#2874f0' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Actions (Login / Cart) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {loggedInUser ? (
            <Button component={Link} to={loggedInUser.isAdmin ? "/admin/dashboard" : "/profile"} sx={{ color: 'white', textTransform: 'none', fontWeight: 600, fontSize: '16px' }}>
              {loggedInUser.isAdmin ? 'Admin' : 'Account'}
            </Button>
          ) : (
             <Button component={Link} to="/login" sx={{ color: '#3f51b5', backgroundColor: 'white', textTransform: 'none', fontWeight: 600, px: 4, py: 0.5, borderRadius: '2px', '&:hover': { backgroundColor: '#f0f0f0' } }}>
              Login
            </Button>
          )}

          <Button component={Link} to="/cart" sx={{ color: 'white', textTransform: 'none', fontWeight: 600, display: 'flex', gap: 1 }}>
            <Badge badgeContent={0} color="error">
              <ShoppingCartIcon />
            </Badge>
            Cart
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};
