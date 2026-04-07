import React from 'react';
import { AccountPage } from './AccountPage';
import { Typography, Grid, TextField, Button, Box } from '@mui/material';
import { Navbar } from '../features/common/Navbar';

export const UserProfilePage = () => {
    return (
        <Box sx={{ bgcolor: '#f1f3f6', minHeight: '100vh' }}>
            <Navbar />
            <AccountPage>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Personal Information</Typography>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="First Name" defaultValue="Abhishek" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="Last Name" defaultValue="Kumar" />
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="subtitle2" sx={{ mb: 1, mt: 2 }}>Your Gender</Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button variant="contained" sx={{ bgcolor: '#3f51b5' }}>Male</Button>
                            <Button variant="outlined">Female</Button>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="Email Address" defaultValue="abhishek@example.com" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="Mobile Number" defaultValue="+91 9876543210" />
                    </Grid>
                    <Grid size={12}>
                        <Button variant="contained" sx={{ mt: 2, bgcolor: '#fb641b', px: 6 }}>SAVE</Button>
                    </Grid>
                </Grid>
            </AccountPage>
        </Box>
    );
};