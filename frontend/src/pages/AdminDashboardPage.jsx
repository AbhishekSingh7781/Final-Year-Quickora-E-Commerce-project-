import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Stack, 
  Avatar,
  IconButton,
  Button,
  Divider,
  CircularProgress
} from '@mui/material';
import { 
  TrendingUp, 
  ShoppingBag, 
  People, 
  Inventory,
  ArrowForward,
  NotificationsActive,
  Settings,
  MoreVert,
  Logout
} from '@mui/icons-material';
import { Navbar } from '../features/common/Navbar';
import { Footer } from '../features/common/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const AdminDashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:5001/orders/stats', {
                    credentials: 'include'
                });
                const data = await response.json();
                setStats(data);
            } catch (err) {
                console.error('Error fetching stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { title: 'Total Revenue', value: stats && stats.totalRevenue !== undefined ? `₹${stats.totalRevenue.toLocaleString()}` : '₹0', icon: <TrendingUp />, color: '#6366f1', bg: '#eef2ff' },
        { title: 'Total Orders', value: stats?.totalOrders || '0', icon: <ShoppingBag />, color: '#10b981', bg: '#f0fdf4' },
        { title: 'Total Products', value: stats?.totalProducts || '0', icon: <Inventory />, color: '#f59e0b', bg: '#fffbeb' },
        { title: 'Active Users', value: stats?.totalUsers || '0', icon: <People />, color: '#ec4899', bg: '#fdf2f8' }
    ];

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8fafc' }}>
            <CircularProgress />
        </Box>
    );

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Container maxWidth="xl" sx={{ mt: 6, mb: 10, flex: 1 }}>
                
                {/* Header Section */}
                <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Box>
                        <Typography variant="h3" sx={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em' }}>Admin Dashboard</Typography>
                        <Typography variant="body1" sx={{ color: '#64748b', mt: 1 }}>Welcome back, Administrator. Here's what's happening today.</Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" startIcon={<Settings />} sx={{ borderRadius: '12px', px: 3, fontWeight: 700, borderColor: '#e2e8f0', color: '#1e293b' }}>Settings</Button>
                        <Button variant="contained" startIcon={<NotificationsActive />} sx={{ borderRadius: '12px', px: 3, bgcolor: '#1e293b', fontWeight: 700 }}>Alerts</Button>
                        <Button component={Link} to="/logout" variant="contained" startIcon={<Logout />} sx={{ borderRadius: '12px', px: 3, bgcolor: '#ef4444', color: 'white', fontWeight: 700, '&:hover': { bgcolor: '#dc2626' } }}>Logout</Button>
                    </Stack>
                </Box>

                {/* Stats Grid */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    {statCards.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                                <Paper elevation={0} sx={{ p: 4, borderRadius: '28px', border: '1px solid #f1f3f6' }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1.5 }}>{stat.title}</Typography>
                                            <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>{stat.value}</Typography>
                                        </Box>
                                        <Avatar sx={{ bgcolor: stat.bg, color: stat.color, width: 56, height: 56, borderRadius: '18px' }}>
                                            {stat.icon}
                                        </Avatar>
                                    </Stack>
                                    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700 }}>+12%</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>than last month</Typography>
                                    </Box>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                {/* Quick Actions & Recent Info */}
                <Grid container spacing={4}>
                    <Grid item xs={12} md={7}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: '32px', border: '1px solid #f1f3f6', height: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Primary Management</Typography>
                                <IconButton><MoreVert /></IconButton>
                            </Box>
                            <Stack spacing={3}>
                                <Box component={Link} to="/admin/orders" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, bgcolor: '#f8fafc', borderRadius: '24px', '&:hover': { bgcolor: '#f1f5f9' } }}>
                                    <Stack direction="row" spacing={3} alignItems="center">
                                        <Avatar sx={{ bgcolor: '#fff', color: '#6366f1', width: 60, height: 60, border: '1px solid #e2e8f0' }}><ShoppingBag /></Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>Order Management</Typography>
                                            <Typography variant="body2" sx={{ color: '#64748b' }}>Update order statuses, view shipping details and handle cancellations.</Typography>
                                        </Box>
                                    </Stack>
                                    <ArrowForward sx={{ color: '#94a3b8' }} />
                                </Box>

                                <Box component={Link} to="/admin/add-product" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, bgcolor: '#f8fafc', borderRadius: '24px', '&:hover': { bgcolor: '#f1f5f9' } }}>
                                    <Stack direction="row" spacing={3} alignItems="center">
                                        <Avatar sx={{ bgcolor: '#fff', color: '#f59e0b', width: 60, height: 60, border: '1px solid #e2e8f0' }}><Inventory /></Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>Inventory Controls</Typography>
                                            <Typography variant="body2" sx={{ color: '#64748b' }}>Add new products, update stock levels, or modify pricing and descriptions.</Typography>
                                        </Box>
                                    </Stack>
                                    <ArrowForward sx={{ color: '#94a3b8' }} />
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Paper 
                          elevation={0} 
                          sx={{ 
                            p: 4, 
                            borderRadius: '32px', 
                            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
                            color: 'white',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                        >
                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, fontFamily: "'Outfit', sans-serif" }}>Grow your empire.</Typography>
                                <Typography variant="body1" sx={{ opacity: 0.8, mb: 4, lineHeight: 1.6 }}>Track every metric, optimize every sale, and deliver excellence with Quickora's advanced admin toolset.</Typography>
                                <Button 
                                  variant="contained" 
                                  sx={{ 
                                    bgcolor: 'white', 
                                    color: '#0f172a', 
                                    borderRadius: '14px', 
                                    px: 4, 
                                    py: 1.5, 
                                    fontWeight: 800,
                                    '&:hover': { bgcolor: '#f1f5f9' } 
                                  }}
                                >
                                    View Full Analytics
                                </Button>
                            </Box>
                            <Avatar sx={{ position: 'absolute', right: -40, bottom: -40, width: 240, height: 240, bgcolor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.1)' }}>
                                <TrendingUp sx={{ fontSize: 160 }} />
                            </Avatar>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
};
