import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  StepConnector, 
  stepConnectorClasses,
  styled,
  Avatar,
  Stack,
  Divider,
  Grid,
  Button
} from '@mui/material';
import { 
  Check, 
  LocalShipping, 
  Inventory, 
  Storefront, 
  Verified,
  ArrowBack,
  HelpOutline
} from '@mui/icons-material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrders, fetchLoggedInUserOrdersAsync } from '../features/order/OrderSlice';
import { Navbar } from '../features/common/Navbar';
import { motion } from 'framer-motion';

// Custom Styled Connector
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: 'linear-gradient(95deg, #6366f1 0%, #a855f7 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: 'linear-gradient(95deg, #6366f1 0%, #a855f7 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#e2e8f0',
    borderRadius: 1,
  },
}));

// Custom Step Icon
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: '#f1f5f9',
  zIndex: 1,
  color: '#94a3b8',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    background: 'linear-gradient(136deg, #6366f1 0%, #a855f7 100%)',
    color: '#fff',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    background: 'linear-gradient(136deg, #6366f1 0%, #a855f7 100%)',
    color: '#fff',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <Verified />,
    2: <Inventory />,
    3: <LocalShipping />,
    4: <Check />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  { label: 'Order Confirmed', description: 'Your order has been received and verified' },
  { label: 'Processing', description: 'Our warehouse is preparing your items' },
  { label: 'Shipped', description: 'Your package is on its way to you' },
  { label: 'Delivered', description: 'Order reached your destination' },
];

export const TrackOrderPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const order = orders.find(o => o.id === id);

    useEffect(() => {
        if (orders.length === 0) {
            dispatch(fetchLoggedInUserOrdersAsync());
        }
    }, [dispatch, orders.length]);

    if (!order) return null;

    const getActiveStep = () => {
        switch (order.status.toLowerCase()) {
            case 'pending': return 1;
            case 'shipped': return 2;
            case 'delivered': return 4;
            default: return 1;
        }
    };

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                {/* Back Button */}
                <Button 
                    startIcon={<ArrowBack />} 
                    onClick={() => navigate(-1)}
                    sx={{ color: '#64748b', fontWeight: 700, mb: 4 }}
                >
                    Order History
                </Button>

                <Grid container spacing={4}>
                    {/* Tracking Status */}
                    <Grid item xs={12} lg={8}>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: '32px', border: '1px solid #f1f3f6', mb: 4 }}>
                                <Box sx={{ mb: 6 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, fontFamily: "'Outfit', sans-serif" }}>
                                        Tracking Order #{order.id.slice(-8).toUpperCase()}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Estimated Delivery: <Box component="span" sx={{ color: '#6366f1', fontWeight: 700 }}>15 April, 2026</Box>
                                    </Typography>
                                </Box>

                                <Stepper alternativeLabel activeStep={getActiveStep()} connector={<ColorlibConnector />}>
                                    {steps.map((step, idx) => (
                                        <Step key={step.label}>
                                            <StepLabel StepIconComponent={ColorlibStepIcon}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 800, mt: 1 }}>{step.label}</Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' } }}>
                                                    {step.description}
                                                </Typography>
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                                <Divider sx={{ my: 6, borderStyle: 'dashed' }} />

                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Live Update Feed</Typography>
                                <Stack spacing={4}>
                                    <Stack direction="row" spacing={3}>
                                        <Avatar sx={{ bgcolor: '#f0fdf4', color: '#10b981', width: 44, height: 44 }}><LocalShipping /></Avatar>
                                        <Box>
                                            <Typography sx={{ fontWeight: 700 }}>Departed from Warehouse</Typography>
                                            <Typography variant="body2" color="text.secondary">Your order has left our Mumbai sorting facility</Typography>
                                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Today, 10:45 AM</Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={3}>
                                        <Avatar sx={{ bgcolor: '#eff6ff', color: '#3b82f6', width: 44, height: 44 }}><Inventory /></Avatar>
                                        <Box>
                                            <Typography sx={{ fontWeight: 700 }}>Package Scanned</Typography>
                                            <Typography variant="body2" color="text.secondary">Quality check completed and packed</Typography>
                                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Yesterday, 04:20 PM</Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={3}>
                                        <Avatar sx={{ bgcolor: '#f5f3ff', color: '#8b5cf6', width: 44, height: 44 }}><Storefront /></Avatar>
                                        <Box>
                                            <Typography sx={{ fontWeight: 700 }}>Order Received</Typography>
                                            <Typography variant="body2" color="text.secondary">We've received your order and payment</Typography>
                                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Yesterday, 03:55 PM</Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </motion.div>
                    </Grid>

                    {/* Order Information Sidebar */}
                    <Grid item xs={12} lg={4}>
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <Paper elevation={0} sx={{ p: 4, borderRadius: '32px', border: '1px solid #f1f3f6', bgcolor: '#fff' }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Order Info</Typography>
                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Delivery Address</Typography>
                                        <Typography sx={{ fontWeight: 700, mt: 1 }}>{order.selectedAddress.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {order.selectedAddress.street}, {order.selectedAddress.locality}<br />
                                            {order.selectedAddress.city}, {order.selectedAddress.state} - {order.selectedAddress.pincode}
                                        </Typography>
                                    </Box>

                                    <Divider />

                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', mb: 2, display: 'block' }}>Items ({order.items.length})</Typography>
                                        <Stack spacing={2}>
                                            {order.items.slice(0, 3).map((item) => (
                                                <Box key={item.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                    <Avatar src={item.product.thumbnail} variant="rounded" sx={{ width: 48, height: 48, bgcolor: '#f8fafc' }} />
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                                                            {item.product.title}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">₹{item.product.price} x {item.quantity}</Typography>
                                                    </Box>
                                                </Box>
                                            ))}
                                            {order.items.length > 3 && (
                                                <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 700 }}>+ {order.items.length - 3} more items</Typography>
                                            )}
                                        </Stack>
                                    </Box>

                                    <Button 
                                        variant="outlined" 
                                        fullWidth 
                                        startIcon={<HelpOutline />}
                                        sx={{ borderRadius: '12px', fontWeight: 700, py: 1.5, mt: 2, borderColor: '#e2e8f0' }}
                                    >
                                        Support Need Help?
                                    </Button>
                                    
                                    <Button 
                                        variant="soft" 
                                        component={Link}
                                        to={`/order-receipt/${order.id}`}
                                        fullWidth 
                                        sx={{ 
                                            borderRadius: '12px', 
                                            fontWeight: 700, 
                                            py: 1.5, 
                                            bgcolor: '#f5f3ff', 
                                            color: '#6366f1',
                                            '&:hover': { bgcolor: '#ede9fe' }
                                        }}
                                    >
                                        View Receipt
                                    </Button>
                                </Stack>
                            </Paper>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
