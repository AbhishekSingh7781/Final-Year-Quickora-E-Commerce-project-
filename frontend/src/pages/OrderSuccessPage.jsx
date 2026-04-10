import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper, 
  Stack, 
  Avatar, 
  Divider,
  Grid
} from '@mui/material';
import { 
  CheckCircle, 
  LocalShipping, 
  Receipt,
  ShoppingBag,
  ArrowForward
} from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCartAsync } from '../features/cart/CartSlice';
import { resetOrder } from '../features/order/OrderSlice';
import { motion } from 'framer-motion';
import { Navbar } from '../features/common/Navbar';

export const OrderSuccessPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        // Reset local state after order success
        dispatch(resetCartAsync());
        dispatch(resetOrder());
    }, [dispatch]);

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
            <Navbar />
            <Container maxWidth="md" sx={{ pt: 10 }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            p: { xs: 4, md: 8 }, 
                            borderRadius: '32px', 
                            textAlign: 'center',
                            border: '1px solid #f1f3f6',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Decorative Gradient Background */}
                        <Box sx={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            right: 0, 
                            height: '6px', 
                            background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)' 
                        }} />

                        <Avatar sx={{ width: 100, height: 100, bgcolor: '#f0fdf4', color: '#10b981', mx: 'auto', mb: 4 }}>
                            <CheckCircle sx={{ fontSize: 64 }} />
                        </Avatar>

                        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: "'Outfit', sans-serif" }}>Order Confirmed!</Typography>
                        <Typography variant="h6" sx={{ color: '#64748b', mb: 4, opacity: 0.8 }}>
                            Thank you for shopping with Quickora. Your order <Box component="span" sx={{ color: '#6366f1', fontWeight: 800 }}>#{id}</Box> has been placed successfully.
                        </Typography>

                        <Divider sx={{ mb: 6, borderStyle: 'dashed' }} />

                        <Grid container spacing={3} sx={{ mb: 6 }}>
                             <Grid item xs={12} sm={4}>
                                <Stack alignItems="center" spacing={1}>
                                    <Avatar sx={{ bgcolor: '#eff6ff', color: '#3b82f6' }}><Receipt /></Avatar>
                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>E-Receipt Sent</Typography>
                                    <Typography variant="caption" color="text.secondary">Check your email</Typography>
                                </Stack>
                             </Grid>
                             <Grid item xs={12} sm={4}>
                                <Stack alignItems="center" spacing={1}>
                                    <Avatar sx={{ bgcolor: '#f0fdf4', color: '#10b981' }}><LocalShipping /></Avatar>
                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>Express Shipping</Typography>
                                    <Typography variant="caption" color="text.secondary">Arriving in 2-3 days</Typography>
                                </Stack>
                             </Grid>
                             <Grid item xs={12} sm={4}>
                                <Stack alignItems="center" spacing={1}>
                                    <Avatar sx={{ bgcolor: '#fef2f2', color: '#ef4444' }}><ShoppingBag /></Avatar>
                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>Order Tracking</Typography>
                                    <Typography variant="caption" color="text.secondary">Real-time updates</Typography>
                                </Stack>
                             </Grid>
                        </Grid>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                            <Button 
                                variant="contained" 
                                component={Link} 
                                to="/" 
                                sx={{ 
                                    py: 2, 
                                    px: 4, 
                                    borderRadius: '16px', 
                                    bgcolor: '#1e293b', 
                                    fontWeight: 700,
                                    '&:hover': { bgcolor: '#0f172a' } 
                                }}
                            >
                                Continue Shopping
                            </Button>
                            <Button 
                                variant="outlined" 
                                component={Link} 
                                to={`/order-receipt/${id}`} 
                                startIcon={<Receipt />}
                                sx={{ 
                                    py: 2, 
                                    px: 4, 
                                    borderRadius: '16px', 
                                    fontWeight: 700,
                                    borderColor: '#e2e8f0'
                                }}
                            >
                                View Receipt
                            </Button>
                            <Button 
                                variant="outlined" 
                                component={Link} 
                                to={`/track-order/${id}`} 
                                endIcon={<ArrowForward />}
                                sx={{ 
                                    py: 2, 
                                    px: 4, 
                                    borderRadius: '16px', 
                                    fontWeight: 700,
                                    borderColor: '#e2e8f0'
                                }}
                            >
                                Track Order
                            </Button>
                        </Stack>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};