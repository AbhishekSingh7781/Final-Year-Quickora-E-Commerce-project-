import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  Stack, 
  Rating, 
  Divider, 
  CircularProgress 
} from '@mui/material';
import { Navbar } from '../features/common/Navbar';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductByIdAsync, selectProductById, selectProductListStatus } from '../features/products/ProductSlice';
import { addToCartAsync, selectItems } from '../features/cart/CartSlice';
import { selectLoggedInUser } from '../features/auth/AuthSlice';
import { motion } from 'framer-motion';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProductById);
  const status = useSelector(selectProductListStatus);
  const user = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectItems);

  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    } else if (product) {
      setSelectedImage(product.thumbnail);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (user) {
      const itemExists = cartItems.find(item => item.product.id === product.id);
      if (itemExists) {
         navigate('/cart');
      } else {
         dispatch(addToCartAsync({ product: product.id, quantity: 1 }));
         navigate('/cart');
      }
    } else {
      navigate('/login');
    }
  };

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) return <Typography sx={{ textAlign: 'center', py: 10 }}>Product not found!</Typography>;

  const discountedPrice = Math.round(product.price * (1 - (product.discountPercentage || 0) / 100));

  return (
    <Box sx={{ backgroundColor: 'white', minHeight: '100vh', pb: 10 }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={6}>
          
          {/* Left Side: Images & Actions */}
          <Grid size={{ xs: 12, md: 5 }}>
             <Box sx={{ position: 'sticky', top: '100px' }}>
                <Paper 
                  elevation={0}
                  variant="outlined" 
                  sx={{ 
                    p: 4, 
                    textAlign: 'center', 
                    mb: 3, 
                    borderRadius: '24px', 
                    border: '1px solid #f1f3f6', 
                    backgroundColor: '#f8fafc',
                    height: '500px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                   <Box 
                      component="img" 
                      src={selectedImage || product.thumbnail} 
                      alt={product.title} 
                      sx={{ maxWidth: '100%', maxHeight: '450px', objectFit: 'contain' }} 
                   />
                </Paper>
                
                {/* Image Gallery row */}
                {product.images && product.images.length > 1 && (
                  <Stack direction="row" spacing={2} sx={{ mb: 3, overflowX: 'auto', p: 1, '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: '10px' } }}>
                     {product.images.map((img, idx) => (
                        <Box 
                          key={idx} 
                          component="img" 
                          src={img} 
                          onClick={() => setSelectedImage(img)}
                          sx={{ 
                            width: 80, 
                            height: 80, 
                            objectFit: 'cover', 
                            borderRadius: '12px', 
                            cursor: 'pointer',
                            border: selectedImage === img ? '2px solid #6366f1' : '1px solid #e2e8f0',
                            transition: 'all 0.2s',
                            flexShrink: 0,
                            '&:hover': { opacity: 0.8, transform: 'scale(1.05)' }
                          }} 
                        />
                     ))}
                  </Stack>
                )}
                <Stack direction="row" spacing={2}>
                   <Button 
                      fullWidth 
                      variant="contained" 
                      onClick={handleAddToCart}
                      startIcon={<ShoppingCartIcon />} 
                      sx={{ 
                        backgroundColor: '#ff9f00', 
                        py: 2, 
                        fontWeight: 700, 
                        fontSize: '16px', 
                        borderRadius: '14px',
                        '&:hover': { backgroundColor: '#fb8c00' }
                      }}
                   >
                      ADD TO CART
                   </Button>
                   <Button 
                      fullWidth 
                      variant="contained" 
                      onClick={handleAddToCart} // Simple buy now for this prototype
                      startIcon={<FlashOnIcon />} 
                      sx={{ 
                        backgroundColor: '#fb641b', 
                        py: 2, 
                        fontWeight: 700, 
                        fontSize: '16px', 
                        borderRadius: '14px',
                        '&:hover': { backgroundColor: '#f4511e' }
                      }}
                   >
                      BUY NOW
                   </Button>
                </Stack>
             </Box>
          </Grid>

          {/* Right Side: Product Info */}
          <Grid size={{ xs: 12, md: 7 }}>
             <Typography variant="body2" sx={{ mb: 2, color: '#64748b', fontWeight: 500 }}>
                {product.category?.name || product.category} / {product.brand?.name || product.brand} / {product.title}
             </Typography>
             <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em', color: '#1e293b', fontFamily: "'Outfit', sans-serif" }}>
                {product.title}
             </Typography>
             
             <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#388e3c', color: 'white', px: 1, py: 0.5, borderRadius: '8px' }}>
                   <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '14px' }}>{product.rating || 4.4}</Typography>
                   <Rating value={1} max={1} size="small" sx={{ color: 'white', ml: 0.5 }} />
                </Box>
                <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 600 }}>12,345 Ratings & 1,500 Reviews</Typography>
             </Stack>

             <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '16px', color: '#10b981', mb: 1 }}>Special Price</Typography>
             <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="h2" sx={{ fontWeight: 800, color: '#1e293b' }}>₹{discountedPrice}</Typography>
                <Box>
                   <Typography variant="h6" sx={{ textDecoration: 'line-through', color: '#94a3b8', lineHeight: 1 }}>₹{product.price}</Typography>
                   <Typography variant="h6" sx={{ fontWeight: 700, color: '#10b981', fontSize: '18px' }}>{product.discountPercentage}% off</Typography>
                </Box>
             </Stack>

             <Divider sx={{ my: 4, borderStyle: 'dashed' }} />

             <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Available offers</Typography>
             <Stack spacing={2}>
                {[1, 2, 3].map(i => (
                   <Stack key={i} direction="row" spacing={2} alignItems="flex-start">
                      <LocalOfferIcon sx={{ color: '#10b981', fontSize: '20px', mt: 0.3 }} />
                      <Typography variant="body1" sx={{ color: '#475569' }}>
                         <Box component="span" sx={{ fontWeight: 700, color: '#1e293b' }}>Bank Offer</Box> 10% instant discount on Cards, up to ₹1,500 on orders of ₹5,000 and above
                      </Typography>
                   </Stack>
                ))}
             </Stack>

             <Divider sx={{ my: 4, borderStyle: 'dashed' }} />

             <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, fontFamily: "'Outfit', sans-serif" }}>Description</Typography>
             <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, fontSize: '16px' }}>
                {product.description || 'Experience cutting-edge technology and premium design with the ' + product.title + '. Optimized for performance and crafted with precision.'}
             </Typography>
             
             <Box sx={{ mt: 6, p: 3, bgcolor: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f3f6' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Warranty & Services</Typography>
                <Grid container spacing={2}>
                   {['1 Year Manufacturer Warranty', '7 Days Replacement Policy', 'Free Delivery'].map((service, index) => (
                      <Grid size={{ xs: 12, sm: 4 }} key={index}>
                         <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>• {service}</Typography>
                      </Grid>
                   ))}
                </Grid>
             </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};