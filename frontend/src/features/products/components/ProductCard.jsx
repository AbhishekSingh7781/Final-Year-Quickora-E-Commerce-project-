import { Card, CardMedia, CardContent, Typography, Box, Stack, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlistAsync, removeFromWishlistAsync, selectWishlistItems } from '../../wishlist/WishlistSlice';
import { toast } from 'react-toastify';

export const ProductCard = ({ product, isAdminCard }) => {
  const { id, title, thumbnail, brand, price, discountPercentage, rating, stock } = product;
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const isWishlisted = wishlistItems.some(item => item.product.id === id);

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
        const item = wishlistItems.find(i => i.product.id === id);
        dispatch(removeFromWishlistAsync(item.id));
        toast.info("Removed from wishlist");
    } else {
        dispatch(addToWishlistAsync({ product: id }));
        toast.success("Added to wishlist");
    }
  };

  const discountedPrice = Math.round(price * (1 - (discountPercentage || 0) / 100));

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
      <Card sx={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        cursor: 'pointer',
        border: '1px solid #f1f3f6',
        borderRadius: '20px',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)'
        }
      }}>
        <Box sx={{ p: 2, background: '#f8fafc', borderRadius: '16px', m: 1, height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <IconButton 
            onClick={(e) => handleToggleWishlist(e)}
            sx={{ 
                position: 'absolute', 
                top: 8, 
                right: 8, 
                bgcolor: 'white', 
                color: isWishlisted ? '#ec4899' : '#94a3b8',
                '&:hover': { bgcolor: '#fdf2f8', color: '#ec4899' },
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                zIndex: 2
            }}
          >
            {isWishlisted ? <Favorite sx={{ fontSize: '20px' }} /> : <FavoriteBorder sx={{ fontSize: '20px' }} />}
          </IconButton>
          <Box
            component="img"
            src={thumbnail || 'https://via.placeholder.com/200'}
            alt={title}
            referrerPolicy="no-referrer"
            sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1, padding: '16px 20px' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', mb: 1, opacity: 0.8 }}>
            {brand?.name || brand}
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 700, fontSize: '15px', color: '#1e293b', mb: 1, height: '44px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {title}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#ecfdf5', color: '#059669', borderRadius: '8px', px: 1, py: 0.4 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '13px', mr: 0.5 }}>{rating || 4.2}</Typography>
              <StarIcon sx={{ fontSize: '13px' }} />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px' }}>(488)</Typography>
          </Stack>

          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '18px', color: '#6366f1' }}>₹{discountedPrice}</Typography>
            {discountPercentage > 0 && (
              <>
                <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '13px' }}>₹{price}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '13px', color: '#10b981' }}>{discountPercentage}% off</Typography>
              </>
            )}
          </Box>
          {isAdminCard && (
             <Typography variant="caption" color="primary" sx={{ display: 'block', mt: 1, fontWeight: 'bold' }}>
               Admin View
             </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};