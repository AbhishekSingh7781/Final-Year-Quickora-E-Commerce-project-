import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectCategories } from '../categories/CategoriesSlice';
import { setCategoryFilter } from '../products/ProductSlice';
import { motion } from 'framer-motion';

export const CategoryRibbon = () => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  const handleCategoryClick = (categoryName) => {
    dispatch(setCategoryFilter(categoryName));
  };

  const getEmoji = (name) => {
    const emojis = {
        'Mobiles': '📱', 'Laptops': '💻', 'Audio': '🎧', 'Fashion': '👕', 
        'Cameras': '📷', 'Appliances': '📺', 'Home': '🏠', 'Toys': '🧸', 
        'Beauty': '💄', 'Sports': '🏸', 'All': '🚀'
    };
    return emojis[name] || '📦';
  };

  return (
    <Box sx={{ 
        width: '100%', 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e0e0e0', 
        display: 'flex', 
        justifyContent: 'center',
        padding: '10px 0',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,.1)'
    }}>
      <Box sx={{ 
          display: 'flex', 
          maxWidth: '1200px', 
          width: '100%', 
          justifyContent: 'space-between',
          overflowX: 'auto',
          px: 2,
          gap: 4
      }}>
        {categories.map((category) => (
            <motion.div 
                key={category._id} 
                onClick={() => handleCategoryClick(category.name)}
                whileHover={{ scale: 1.05, color: '#2874f0' }} 
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80px' }}
            >
                <Box sx={{ width: 64, height: 64, mb: 1, backgroundColor: '#f0f0f0', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px' }}>
                    {getEmoji(category.name)}
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#333', textAlign: 'center' }}>
                    {category.name}
                </Typography>
            </motion.div>
        ))}
      </Box>
    </Box>
  );
};
