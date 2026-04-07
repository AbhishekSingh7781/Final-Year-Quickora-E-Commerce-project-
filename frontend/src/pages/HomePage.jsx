import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Grid, CircularProgress, IconButton } from '@mui/material';
import { Navbar } from '../features/common/Navbar';
import { CategoryRibbon } from '../features/common/CategoryRibbon';
import { ProductCard } from '../features/products/components/ProductCard';
import { Footer } from '../features/common/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllProducts, fetchProductsAsync, selectProductListStatus, selectFilters, setCategoryFilter } from '../features/products/ProductSlice';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const CAROUSEL_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1600',
    title: 'Top Laptops',
    desc: 'Unbeatable performance and design',
    action: 'Shop Laptops',
    category: 'Laptops'
  },
  {
    image: 'https://images.unsplash.com/photo-1696426375893-79a3db507e0d?auto=format&fit=crop&q=80&w=1600',
    title: 'Newest Mobiles',
    desc: 'Cutting edge technology in your hand',
    action: 'Upgrade Now',
    category: 'Mobiles'
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1600',
    title: 'Fashion Sale',
    desc: 'Refresh your wardrobe today up to 50% off',
    action: 'Discover Style',
    category: 'Fashion'
  },
];

export const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductListStatus);
  const filters = useSelector(selectFilters);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchProductsAsync({ filter: filters || {}, sort: {}, pagination: {} }));
  }, [dispatch, filters]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? CAROUSEL_ITEMS.length - 1 : prev - 1));

  const handleBannerClick = (category) => {
    dispatch(setCategoryFilter(category));
  };

  return (
    <Box sx={{ backgroundColor: '#f1f3f6', minHeight: '100vh', paddingBottom: 5 }}>
      <Navbar />
      <CategoryRibbon />

      {/* Sliding Carousel Area */}
      <Box sx={{ position: 'relative', width: '100%', height: { xs: 240, md: 400 }, mt: 1, overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          >
            <Box sx={{ 
              width: '100%', 
              height: '100%', 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${CAROUSEL_ITEMS[currentSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              px: 2,
              textAlign: 'center'
            }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, fontFamily: "'Outfit', sans-serif", textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                {CAROUSEL_ITEMS[currentSlide].title}
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, opacity: 0.9, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                {CAROUSEL_ITEMS[currentSlide].desc}
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => handleBannerClick(CAROUSEL_ITEMS[currentSlide].category)}
                sx={{ backgroundColor: 'white', color: '#1e293b', fontWeight: 700, borderRadius: '12px', px: 4, py: 1.5, '&:hover': { backgroundColor: '#f9f9f9', transform: 'scale(1.05)' }, transition: 'all 0.2s' }}
              >
                {CAROUSEL_ITEMS[currentSlide].action}
              </Button>
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <IconButton onClick={prevSlide} sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.3)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' }}}>
           <ArrowBackIosNew />
        </IconButton>
        <IconButton onClick={nextSlide} sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.3)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' }}}>
           <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        
        {/* Suggested For You Section */}
        <Box sx={{ backgroundColor: 'white', p: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: '16px' }}>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
              {filters?.category && filters.category !== 'All' ? `${filters.category} Collection` : 'Suggested for You'}
            </Typography>
            <Button variant="text" onClick={() => dispatch(setCategoryFilter('All'))} sx={{ color: '#6366f1', fontWeight: 600 }}>
              {filters?.category && filters.category !== 'All' ? 'Clear Filter' : 'View All'}
            </Button>
          </Box>

          {status === 'loading' ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
               <CircularProgress color="primary" />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {products && products.length > 0 ? products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} xl={2.4}>
                  <Link to={`/product-details/${product.id}`} style={{ textDecoration: 'none' }}>
                    <ProductCard product={product} />
                  </Link>
                </Grid>
              )) : (
                <Box sx={{ width: '100%', py: 10, textAlign: 'center' }}>
                   <Typography color="text.secondary">No products found for this category.</Typography>
                </Box>
              )}
            </Grid>
          )}
        </Box>

      </Container>
      <Footer />
    </Box>
  );
}