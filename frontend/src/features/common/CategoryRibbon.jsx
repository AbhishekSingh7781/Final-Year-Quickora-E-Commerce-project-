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
        {[{id: 'all', name: 'All'}, ...categories].map((category) => (
            <motion.div 
                key={category.id || category._id} 
                onClick={() => handleCategoryClick(category.name)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                    cursor: 'pointer', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    minWidth: '70px',
                    transition: 'all 0.2s ease'
                }}
            >
                <Box sx={{ 
                    width: 60, 
                    height: 60, 
                    mb: 1.5, 
                    backgroundColor: '#f8fafc', 
                    borderRadius: '20px', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    fontSize: '32px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    border: '1px solid #f1f3f6',
                    '&:hover': {
                        backgroundColor: '#eff6ff',
                        borderColor: '#bfdbfe'
                    }
                }}>
                    {getEmoji(category.name)}
                </Box>
                <Typography variant="body2" sx={{ 
                    fontWeight: 700, 
                    color: '#1e293b', 
                    textAlign: 'center',
                    fontSize: '13px',
                    letterSpacing: '0.01em'
                }}>
                    {category.name}
                </Typography>
            </motion.div>
        ))}
      </Box>
    </Box>
  );
};
