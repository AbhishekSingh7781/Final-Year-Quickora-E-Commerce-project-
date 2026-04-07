import React from 'react';
import { Box, Grid, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Link } from 'react-router-dom';

export const AccountPage = ({ children }) => {
    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4 }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Paper sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#3f51b5' }}>A</Avatar>
                        <Box>
                            <Typography variant="caption" color="text.secondary">Hello,</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Abhishek Kumar</Typography>
                        </Box>
                    </Paper>
                    <Paper>
                        <List component="nav">
                            <ListItem>
                                <ListItemIcon><ShoppingBagIcon color="primary" /></ListItemIcon>
                                <ListItemText primary="MY ORDERS" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
                                <ListItemText primary="PROFILE SETTINGS" />
                            </ListItem>
                            <ListItem sx={{ pl: 9 }}>
                                <ListItemText primary="Personal Information" />
                            </ListItem>
                            <ListItem sx={{ pl: 9 }}>
                                <ListItemText primary="Manage Addresses" />
                            </ListItem>
                            <Divider />
                            <ListItem component={Link} to="/logout" sx={{ color: 'inherit', textDecoration: 'none' }}>
                                <ListItemIcon><PowerSettingsNewIcon color="primary" /></ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 9 }}>
                    <Paper sx={{ p: 4, minHeight: 400 }}>
                        {children || (
                            <Box sx={{ textAlign: 'center', mt: 10 }}>
                                <Typography variant="h5" gutterBottom>Welcome to your Account</Typography>
                                <Typography color="text.secondary">Select an option from the menu to manage your orders or profile.</Typography>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
