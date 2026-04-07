import React, { useEffect } from 'react';
import { Box, Typography, Paper, Grid, Button, Stepper, Step, StepLabel, Divider, Chip, Avatar, CircularProgress, Container } from '@mui/material';
import { Navbar } from '../features/common/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectOrders, selectOrderStatus } from '../features/order/OrderSlice';
import { ShoppingBag, LocalShipping, CheckCircle, ErrorOutline, Timer } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'pending': return '#f59e0b';
        case 'shipped': return '#6366f1';
        case 'delivered': return '#10b981';
        case 'cancelled': return '#ef4444';
        default: return '#94a3b8';
    }
};

const getActiveStep = (status) => {
    switch (status?.toLowerCase()) {
        case 'pending': return 0;
        case 'shipped': return 1;
        case 'delivered': return 3;
        default: return 0;
    }
};

const steps = ['Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];

export const UserOrdersPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const status = useSelector(selectOrderStatus);

    useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync());
    }, [dispatch]);

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#6366f1', width: 56, height: 56 }}>
                        <ShoppingBag />
                    </Avatar>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>My Orders</Typography>
                        <Typography variant="body1" color="text.secondary">Review and track your recent purchases</Typography>
                    </Box>
                </Box>

                {status === 'loading' ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 15 }}>
                        <CircularProgress sx={{ color: '#6366f1' }} />
                    </Box>
                ) : orders.length === 0 ? (
                    <Paper elevation={0} sx={{ p: 10, textAlign: 'center', borderRadius: '32px', border: '1px solid #f1f3f6' }}>
                        <Box sx={{ fontSize: '80px', mb: 2 }}>🛍️</Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>No orders yet</Typography>
                        <Typography color="text.secondary" sx={{ mb: 4 }}>Looks like you haven't bought anything. Time to start shopping!</Typography>
                        <Button variant="contained" href="/" sx={{ bgcolor: '#6366f1', px: 4, py: 1.5, borderRadius: '12px', fontWeight: 700 }}>
                            Go to Store
                        </Button>
                    </Paper>
                ) : (
                    <AnimatePresence>
                        {orders.map((order, idx) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: '24px', border: '1px solid #f1f3f6', overflow: 'hidden' }}>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} md={8}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                                <Box>
                                                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Order ID</Typography>
                                                    <Typography variant="body1" sx={{ fontWeight: 800 }}>#{order.id.slice(-10).toUpperCase()}</Typography>
                                                </Box>
                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Chip 
                                                        label={order.status.toUpperCase()} 
                                                        sx={{ bgcolor: getStatusColor(order.status) + '20', color: getStatusColor(order.status), fontWeight: 800, borderRadius: '8px' }} 
                                                    />
                                                </Box>
                                            </Box>

                                            <Divider sx={{ mb: 3 }} />

                                            <Stack spacing={3}>
                                                {order.items.map((item) => (
                                                    <Box key={item.id} sx={{ display: 'flex', gap: 3 }}>
                                                        <Box component="img" src={item.product.thumbnail} sx={{ width: 80, height: 80, objectFit: 'contain', bgcolor: '#f8fafc', p: 1, borderRadius: '12px' }} />
                                                        <Box sx={{ flex: 1 }}>
                                                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{item.product.title}</Typography>
                                                            <Typography variant="body2" color="text.secondary">Quantity: {item.quantity}</Typography>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>₹{item.product.price * item.quantity}</Typography>
                                                        </Box>
                                                    </Box>
                                                ))}
                                            </Stack>

                                            <Box sx={{ mt: 5 }}>
                                                <Stepper activeStep={getActiveStep(order.status)} alternativeLabel>
                                                    {steps.map((label) => (
                                                        <Step key={label}>
                                                            <StepLabel StepIconProps={{ sx: { '&.Mui-active': { color: '#6366f1' } } }}>
                                                                <Typography variant="caption" sx={{ fontWeight: 700 }}>{label}</Typography>
                                                            </StepLabel>
                                                        </Step>
                                                    ))}
                                                </Stepper>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Box sx={{ height: '100%', bgcolor: '#f8fafc', p: 4, borderRadius: '20px' }}>
                                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Payment Summary</Typography>
                                                <Stack spacing={2}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography color="text.secondary">Total Amount</Typography>
                                                        <Typography sx={{ fontWeight: 800 }}>₹{Math.round(order.totalAmount)}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography color="text.secondary">Method</Typography>
                                                        <Typography sx={{ fontWeight: 700, textTransform: 'uppercase' }}>{order.paymentMethod}</Typography>
                                                    </Box>
                                                    <Divider />
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>Shipping Address</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {order.selectedAddress.name}<br />
                                                        {order.selectedAddress.street}<br />
                                                        {order.selectedAddress.city}, {order.selectedAddress.state} - {order.selectedAddress.pincode}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </Container>
        </Box>
    );
};

const Stack = ({ children, spacing = 2, sx = {} }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacing, ...sx }}>
        {children}
    </Box>
);