import React, { useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Divider, 
  Button, 
  Stack, 
  Avatar, 
  IconButton,
  Chip
} from '@mui/material';
import { 
  Print, 
  Download, 
  ArrowBack, 
  ShoppingBag, 
  LocalShipping, 
  ReceiptLong,
  Payment
} from '@mui/icons-material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrders, fetchLoggedInUserOrdersAsync } from '../features/order/OrderSlice';
import { Navbar } from '../features/common/Navbar';
import { motion } from 'framer-motion';

export const OrderReceiptPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const order = orders.find(o => o.id === id);
    const receiptRef = useRef();

    useEffect(() => {
        if (orders.length === 0) {
            dispatch(fetchLoggedInUserOrdersAsync());
        }
    }, [dispatch, orders.length]);

    if (!order) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 5 }}>
                {/* Header Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }} className="no-print">
                    <Button 
                        startIcon={<ArrowBack />} 
                        onClick={() => navigate(-1)}
                        sx={{ color: '#64748b', fontWeight: 700 }}
                    >
                        Back
                    </Button>
                    <Stack direction="row" spacing={2}>
                        <Button 
                            variant="outlined" 
                            startIcon={<Print />} 
                            onClick={handlePrint}
                            sx={{ borderRadius: '12px', fontWeight: 700, borderColor: '#e2e8f0' }}
                        >
                            Print Receipt
                        </Button>
                        <Button 
                            variant="contained" 
                            component={Link}
                            to={`/track-order/${order.id}`}
                            sx={{ bgcolor: '#6366f1', borderRadius: '12px', fontWeight: 700 }}
                        >
                            Track Order
                        </Button>
                    </Stack>
                </Box>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Paper 
                        ref={receiptRef}
                        elevation={0} 
                        sx={{ 
                            p: { xs: 3, md: 6 }, 
                            borderRadius: '32px', 
                            border: '1px solid #f1f3f6',
                            position: 'relative',
                            bgcolor: '#fff'
                        }}
                    >
                        {/* Receipt Header */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 6 }}>
                            <Box>
                                <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b', mb: 1, fontFamily: "'Outfit', sans-serif" }}>
                                    QUICKORA
                                </Typography>
                                <Typography variant="body2" color="text.secondary">Order #{order.id.toUpperCase()}</Typography>
                                <Typography variant="body2" color="text.secondary">Placed on {new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                                <Chip 
                                    label={order.status.toUpperCase()} 
                                    sx={{ 
                                        bgcolor: order.status === 'delivered' ? '#f0fdf4' : '#eff6ff', 
                                        color: order.status === 'delivered' ? '#10b981' : '#3b82f6',
                                        fontWeight: 800,
                                        px: 2
                                    }} 
                                />
                            </Box>
                        </Box>

                        <Divider sx={{ mb: 6 }} />

                        {/* Customer & Shipping Info */}
                        <Grid container spacing={4} sx={{ mb: 6 }}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#94a3b8', mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
                                    Shipping Address
                                </Typography>
                                <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{order.selectedAddress.name}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                    {order.selectedAddress.street}, {order.selectedAddress.locality}<br />
                                    {order.selectedAddress.city}, {order.selectedAddress.state}<br />
                                    {order.selectedAddress.pincode}<br />
                                    Phone: {order.selectedAddress.phone}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#94a3b8', mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
                                    Payment Details
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                                    <Avatar sx={{ bgcolor: '#f8fafc', color: '#6366f1' }}><Payment /></Avatar>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700 }}>{order.paymentMethod.toUpperCase()}</Typography>
                                        <Typography variant="caption" color="text.secondary">Transaction ID: TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>

                        {/* Order Items */}
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#94a3b8', mb: 3, textTransform: 'uppercase', letterSpacing: 1 }}>
                            Order Summary
                        </Typography>
                        <Stack spacing={3} sx={{ mb: 6 }}>
                            {order.items.map((item) => (
                                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Stack direction="row" spacing={3} alignItems="center">
                                        <Avatar 
                                            src={item.product.thumbnail} 
                                            variant="rounded"
                                            sx={{ width: 64, height: 64, bgcolor: '#f8fafc', p: 1 }}
                                        />
                                        <Box>
                                            <Typography sx={{ fontWeight: 700 }}>{item.product.title}</Typography>
                                            <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                                        </Box>
                                    </Stack>
                                    <Typography sx={{ fontWeight: 800 }}>₹{item.product.price * item.quantity}</Typography>
                                </Box>
                            ))}
                        </Stack>

                        <Divider sx={{ mb: 4 }} />

                        {/* Order Totals */}
                        <Box sx={{ maxWidth: 300, ml: 'auto' }}>
                            <Stack spacing={2}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="text.secondary">Subtotal</Typography>
                                    <Typography sx={{ fontWeight: 700 }}>₹{Math.round(order.totalAmount)}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="text.secondary">Shipping</Typography>
                                    <Typography sx={{ fontWeight: 700, color: '#10b981' }}>FREE</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="text.secondary">Tax (GST)</Typography>
                                    <Typography sx={{ fontWeight: 700 }}>₹0</Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>Total</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 900, color: '#6366f1' }}>₹{Math.round(order.totalAmount)}</Typography>
                                </Box>
                            </Stack>
                        </Box>

                        {/* Footer Note */}
                        <Box sx={{ mt: 10, textAlign: 'center', p: 4, bgcolor: '#f8fafc', borderRadius: '16px' }}>
                            <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>Thank you for your purchase!</Typography>
                            <Typography variant="caption" color="text.secondary">Need help? Contact support at support@quickora.shop</Typography>
                        </Box>
                    </Paper>
                </motion.div>
            </Container>

            {/* Print Styles */}
            <style>
                {`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; }
                    .MuiPaper-root { border: none !important; padding: 0 !important; }
                }
                `}
            </style>
        </Box>
    );
};
