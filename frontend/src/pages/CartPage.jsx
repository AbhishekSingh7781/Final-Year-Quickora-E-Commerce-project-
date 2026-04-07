import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Stack, 
  Paper, 
  Divider, 
  Grid, 
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Add, 
  Remove, 
  DeleteOutline, 
  ArrowBackIos,
  LocalShippingOutlined,
  VerifiedUserOutlined,
  SwapHorizontalCircleOutlined,
  FavoriteBorderOutlined
} from '@mui/icons-material';
import { Navbar } from '../features/common/Navbar';
import { Footer } from '../features/common/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectItems, 
  deleteItemFromCartAsync, 
  updateCartAsync,
  selectCartStatus
} from '../features/cart/CartSlice';
import { addToWishlistAsync } from '../features/wishlist/WishlistSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const CartPage = () => {
    const cartItems = useSelector(selectItems);
    const status = useSelector(selectCartStatus);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleQuantity = (e, item, delta) => {
        const newQuantity = item.quantity + delta;
        if (newQuantity >= 1 && newQuantity <= 10) {
            dispatch(updateCartAsync({ id: item.id, quantity: newQuantity }));
        }
    };

    const handleRemove = (id) => {
        dispatch(deleteItemFromCartAsync(id));
    };

    const handleMoveToWishlist = (item) => {
        dispatch(addToWishlistAsync({ product: item.product.id }));
        dispatch(deleteItemFromCartAsync(item.id));
        toast.success("Moved to wishlist!");
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + (item.product.price * (1 - (item.product.discountPercentage || 0) / 100) * item.quantity), 0);
    const totalMRP = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, flex: 1 }}>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton component={Link} to="/" sx={{ bgcolor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <ArrowBackIos sx={{ fontSize: '16px', ml: 0.5 }} />
                    </IconButton>
                    <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>Shopping Cart</Typography>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} lg={8}>
                        <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: '24px', border: '1px solid #f1f3f6' }}>
                           <AnimatePresence mode="popLayout">
                            {cartItems.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ textAlign: 'center', padding: '60px 0' }}
                                >
                                    <Box 
                                        component="img" 
                                        src="https://cdn-icons-png.flaticon.com/512/11329/11329061.png" 
                                        sx={{ width: 120, mb: 3, opacity: 0.5 }} 
                                    />
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Your cart is looking lonely</Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Time to fill it with some amazing premium products!</Typography>
                                    <Button 
                                        variant="contained" 
                                        component={Link} 
                                        to="/" 
                                        sx={{ 
                                            bgcolor: '#6366f1', 
                                            px: 6, 
                                            py: 2, 
                                            borderRadius: '16px', 
                                            fontWeight: 700,
                                            boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)'
                                        }}
                                    >
                                        Explore Products
                                    </Button>
                                </motion.div>
                            ) : (
                                <Stack spacing={3}>
                                    {cartItems.map((item) => (
                                        <motion.div 
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, p: 2, borderRadius: '20px', '&:hover': { bgcolor: '#f8fafc' } }}>
                                                <Box 
                                                    sx={{ 
                                                        width: { xs: 80, md: 120 }, 
                                                        height: { xs: 80, md: 120 }, 
                                                        bgcolor: 'white', 
                                                        borderRadius: '16px', 
                                                        p: 1.5, 
                                                        border: '1px solid #f1f3f6', 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        justifyContent: 'center' 
                                                    }}
                                                >
                                                    <img src={item.product.thumbnail} alt={item.product.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                                </Box>
                                                
                                                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <Box>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#6366f1', mb: 0.5, textTransform: 'uppercase', fontSize: '11px' }}>{item.product.brand}</Typography>
                                                            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '15px', md: '18px' }, mb: 1 }}>{item.product.title}</Typography>
                                                        </Box>
                                                        <Stack direction="row" spacing={1}>
                                                            <Tooltip title="Move to Wishlist">
                                                                <IconButton onClick={() => handleMoveToWishlist(item)} sx={{ color: '#ec4899', bgcolor: '#fdf2f8' }}>
                                                                    <FavoriteBorderOutlined />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <IconButton onClick={() => handleRemove(item.id)} sx={{ color: '#ef4444', bgcolor: '#fef2f2' }}>
                                                                <DeleteOutline />
                                                            </IconButton>
                                                        </Stack>
                                                    </Box>

                                                    <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                                        <Box>
                                                            <Typography variant="h6" sx={{ fontWeight: 800 }}>₹{Math.round(item.product.price * (1 - (item.product.discountPercentage || 0) / 100))}</Typography>
                                                            {item.product.discountPercentage > 0 && (
                                                                <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94a3b8' }}>₹{item.product.price}</Typography>
                                                            )}
                                                        </Box>
                                                        
                                                        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', p: 0.5 }}>
                                                            <IconButton size="small" onClick={(e) => handleQuantity(e, item, -1)} disabled={item.quantity <= 1 || status === 'loading'}>
                                                                <Remove fontSize="small" />
                                                            </IconButton>
                                                            <Typography sx={{ mx: 2, fontWeight: 700, fontSize: '14px', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</Typography>
                                                            <IconButton size="small" onClick={(e) => handleQuantity(e, item, 1)} disabled={item.quantity >= 10 || status === 'loading'}>
                                                                <Add fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Divider sx={{ mt: 3, borderStyle: 'dashed' }} />
                                        </motion.div>
                                    ))}
                                    <Box sx={{ pt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button 
                                            variant="contained" 
                                            size="large"
                                            onClick={() => navigate('/checkout')}
                                            sx={{ 
                                                bgcolor: '#1e293b', 
                                                px: 6, 
                                                py: 2, 
                                                borderRadius: '16px', 
                                                fontWeight: 700,
                                                '&:hover': { bgcolor: '#0f172a' }
                                            }}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </Box>
                                </Stack>
                            )}
                           </AnimatePresence>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Stack spacing={3}>
                            <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #f1f3f6' }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Order Summary</Typography>
                                <Stack spacing={2.5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography color="text.secondary">Price ({totalItems} items)</Typography>
                                        <Typography sx={{ fontWeight: 600 }}>₹{Math.round(totalMRP)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography color="text.secondary">Discount</Typography>
                                        <Typography color="#10b981" sx={{ fontWeight: 700 }}>-₹{Math.round(totalMRP - totalAmount)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography color="text.secondary">Delivery Charges</Typography>
                                        <Typography color="#10b981" sx={{ fontWeight: 700 }}>FREE</Typography>
                                    </Box>
                                    <Divider sx={{ borderStyle: 'dashed' }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h5" sx={{ fontWeight: 800 }}>Total</Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#6366f1' }}>₹{Math.round(totalAmount)}</Typography>
                                    </Box>
                                </Stack>
                                <Box sx={{ mt: 3, p: 2, bgcolor: '#f0fdf4', borderRadius: '14px', border: '1px solid #dcfce7' }}>
                                    <Typography variant="body2" color="#166534" sx={{ fontWeight: 600, textAlign: 'center' }}>
                                        You're saving ₹{Math.round(totalMRP - totalAmount)} on this order!
                                    </Typography>
                                </Box>
                            </Paper>

                            <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid #f1f3f6', bgcolor: '#f8fafc' }}>
                                <Stack spacing={2}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <VerifiedUserOutlined color="primary" />
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>Secure Payment Processing</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <SwapHorizontalCircleOutlined color="primary" />
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>7-Day Easy Return Policy</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <LocalShippingOutlined color="primary" />
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>Free Express Delivery on all orders</Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
};