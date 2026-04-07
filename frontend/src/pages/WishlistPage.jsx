import React, { useEffect } from 'react';
import { Box, Typography, Paper, Grid, Button, IconButton, Avatar, CircularProgress, Container } from '@mui/material';
import { Navbar } from '../features/common/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlistAsync, removeFromWishlistAsync, selectWishlistItems, selectWishlistStatus } from '../features/wishlist/WishlistSlice';
import { Delete, ShoppingCart, Favorite } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { addToCartAsync } from '../features/cart/CartSlice';
import { toast } from 'react-toastify';

export const WishlistPage = () => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(selectWishlistItems);
    const status = useSelector(selectWishlistStatus);

    useEffect(() => {
        dispatch(fetchWishlistAsync());
    }, [dispatch]);

    const handleRemove = (id) => {
        dispatch(removeFromWishlistAsync(id));
        toast.info("Removed from wishlist");
    };

    const handleAddToCart = (product) => {
        dispatch(addToCartAsync({ product: product, quantity: 1 }));
        toast.success("Added to cart");
    };

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#ec4899', width: 56, height: 56 }}>
                        <Favorite />
                    </Avatar>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>My Wishlist</Typography>
                        <Typography variant="body1" color="text.secondary">Your favorite items saved for later</Typography>
                    </Box>
                </Box>

                {status === 'loading' && wishlistItems.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 15 }}>
                        <CircularProgress sx={{ color: '#ec4899' }} />
                    </Box>
                ) : wishlistItems.length === 0 ? (
                    <Paper elevation={0} sx={{ p: 10, textAlign: 'center', borderRadius: '32px', border: '1px solid #f1f3f6' }}>
                        <Box sx={{ fontSize: '80px', mb: 2 }}>❤️</Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Your wishlist is empty</Typography>
                        <Typography color="text.secondary" sx={{ mb: 4 }}>Save items you love and they'll show up here.</Typography>
                        <Button variant="contained" href="/" sx={{ bgcolor: '#6366f1', px: 4, py: 1.5, borderRadius: '12px', fontWeight: 700 }}>
                            Explore Products
                        </Button>
                    </Paper>
                ) : (
                    <Grid container spacing={3}>
                        <AnimatePresence>
                            {wishlistItems.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item.id}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        layout
                                    >
                                        <Paper elevation={0} sx={{ p: 2, borderRadius: '24px', border: '1px solid #f1f3f6', overflow: 'hidden', position: 'relative' }}>
                                            <Box sx={{ position: 'absolute', right: 10, top: 10, zIndex: 2 }}>
                                                <IconButton onClick={() => handleRemove(item.id)} sx={{ bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: '#fee2e2', color: '#ef4444' } }}>
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </Box>
                                            <Box 
                                                component="img" 
                                                src={item.product.thumbnail} 
                                                sx={{ width: '100%', height: 200, objectFit: 'contain', bgcolor: '#f8fafc', borderRadius: '16px', mb: 2 }} 
                                            />
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5, noWrap: true, display: 'block' }}>{item.product.title}</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#6366f1', mb: 2 }}>₹{item.product.price}</Typography>
                                            <Button 
                                                fullWidth 
                                                variant="contained" 
                                                startIcon={<ShoppingCart />}
                                                onClick={() => handleAddToCart(item.product)}
                                                sx={{ bgcolor: '#1e293b', borderRadius: '12px', py: 1.2, fontWeight: 700 }}
                                            >
                                                Move to Cart
                                            </Button>
                                        </Paper>
                                    </motion.div>
                                </Grid>
                            ))}
                        </AnimatePresence>
                    </Grid>
                )}
            </Container>
        </Box>
    );
};