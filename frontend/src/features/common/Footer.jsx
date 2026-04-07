import React from 'react';
import { Box, Container, Grid, Typography, Stack, Divider } from '@mui/material';

export const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#172337', color: 'white', pt: 6, pb: 2, mt: 'auto' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2}>
            <Typography sx={{ color: '#878787', mb: 2, fontSize: '12px', fontWeight: 'bold' }}>ABOUT</Typography>
            <Stack spacing={1}>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Contact Us</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>About Us</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Careers</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Quickora Stories</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography sx={{ color: '#878787', mb: 2, fontSize: '12px', fontWeight: 'bold' }}>HELP</Typography>
            <Stack spacing={1}>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Payments</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Shipping</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Cancellation & Returns</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>FAQ</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography sx={{ color: '#878787', mb: 2, fontSize: '12px', fontWeight: 'bold' }}>POLICY</Typography>
            <Stack spacing={1}>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Return Policy</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Terms Of Use</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Security</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Privacy</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography sx={{ color: '#878787', mb: 2, fontSize: '12px', fontWeight: 'bold' }}>SOCIAL</Typography>
            <Stack spacing={1}>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Facebook</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Twitter</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>YouTube</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} sx={{ borderLeft: { md: '1px solid #454d5e' }, pl: { md: 4 } }}>
             <Typography sx={{ color: '#878787', mb: 2, fontSize: '12px', fontWeight: 'bold' }}>Mail Us:</Typography>
             <Typography variant="caption" sx={{ display: 'block', color: '#fff', mb: 2 }}>
                Quickora Internet Private Limited,<br/>
                Buildings Alyssa, Begonia &<br/>
                Clove Embassy Tech Village,<br/>
                Bengaluru, 560103,<br/>
                Karnataka, India
             </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ backgroundColor: '#454d5e', mb: 2 }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, py: 2 }}>
           <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>💼 Become a Seller</Typography>
           <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>🌟 Advertise</Typography>
           <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>🎁 Gift Cards</Typography>
           <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>❓ Help Center</Typography>
           <Typography variant="caption">© 2026 Quickora.com</Typography>
        </Box>
      </Container>
    </Box>
  );
};
