import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Paper, 
  TextField, 
  Grid, 
  Divider, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl,
  Stack,
  IconButton,
  Avatar,
  CircularProgress,
  Container
} from '@mui/material';
import { 
  ArrowBackIos,
  LocalShipping,
  Payment,
  ReceiptLong,
  LocationOn,
  CheckCircle
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems } from '../features/cart/CartSlice';
import { createOrderAsync, selectCurrentOrder, selectOrderStatus } from '../features/order/OrderSlice';
import { useNavigate, Navigate } from 'react-router-dom';
import { Navbar } from '../features/common/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const steps = ['Delivery Address', 'Order Summary', 'Payment Details'];

export const CheckoutPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [address, setAddress] = useState({
        name: 'Abhishek Kumar',
        phone: '+91 9876543210',
        pincode: '800001',
        city: 'Patna',
        state: 'Bihar',
        street: 'Main Road, Kankarbagh'
    });

    const cartItems = useSelector(selectItems);
    const currentOrder = useSelector(selectCurrentOrder);
    const status = useSelector(selectOrderStatus);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (cartItems.length === 0 && !currentOrder) {
        return <Navigate to="/" replace={true}></Navigate>
    }

    if (currentOrder) {
        return <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>
    }

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const totalAmount = cartItems.reduce((acc, item) => acc + (item.product.price * (1 - (item.product.discountPercentage || 0) / 100) * item.quantity), 0);
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleOrder = () => {
        const order = {
            items: cartItems,
            totalAmount,
            totalItems,
            user: "placeholder_user_id", // Backend handles this via JWT
            paymentMethod,
            selectedAddress: address,
            status: 'pending'
        };
        dispatch(createOrderAsync(order));
    };

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ pt: 6 }}>
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif", mb: 2 }}>Secure Checkout</Typography>
                    <Box sx={{ width: '100%', maxWidth: '800px', mx: 'auto', mt: 4 }}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel StepIconProps={{ sx: { '&.Mui-active': { color: '#6366f1' }, '&.Mui-completed': { color: '#10b981' } } }}>
                                        <Typography variant="caption" sx={{ fontWeight: 700, opacity: activeStep >= index ? 1 : 0.5 }}>{label}</Typography>
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </Box>

                <Grid container spacing={5}>
                    <Grid item xs={12} lg={8}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #f1f3f6' }}>
                            <AnimatePresence mode="wait">
                                {activeStep === 0 && (
                                    <motion.div key="address" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                                            <Avatar sx={{ bgcolor: '#6366f1' }}><LocationOn /></Avatar>
                                            <Typography variant="h5" sx={{ fontWeight: 800 }}>Delivery Information</Typography>
                                        </Stack>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth label="Full Name" value={address.name} onChange={(e) => setAddress({...address, name: e.target.value})} sx={inputStyles} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth label="Phone Number" value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})} sx={inputStyles} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField fullWidth multiline rows={3} label="Street Address" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} sx={inputStyles} />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField fullWidth label="City" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} sx={inputStyles} />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField fullWidth label="State" value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} sx={inputStyles} />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField fullWidth label="Pincode" value={address.pincode} onChange={(e) => setAddress({...address, pincode: e.target.value})} sx={inputStyles} />
                                            </Grid>
                                        </Grid>
                                        <Button variant="contained" size="large" fullWidth sx={{ mt: 5, py: 2, borderRadius: '16px', bgcolor: '#6366f1', fontWeight: 800 }} onClick={handleNext}>
                                            Save & Continue
                                        </Button>
                                    </motion.div>
                                )}

                                {activeStep === 1 && (
                                    <motion.div key="summary" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                                            <Avatar sx={{ bgcolor: '#8b5cf6' }}><ReceiptLong /></Avatar>
                                            <Typography variant="h5" sx={{ fontWeight: 800 }}>Order Summary</Typography>
                                        </Stack>
                                        <Stack spacing={3}>
                                            {cartItems.map((item) => (
                                                <Box key={item.id} sx={{ display: 'flex', gap: 3, p: 2, bgcolor: '#f8fafc', borderRadius: '20px' }}>
                                                    <Box component="img" src={item.product.thumbnail} sx={{ width: 80, height: 80, objectFit: 'contain', bgcolor: 'white', p: 1, borderRadius: '12px' }} />
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '16px' }}>{item.product.title}</Typography>
                                                        <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#6366f1' }}>₹{Math.round(item.product.price * (1 - (item.product.discountPercentage || 0) / 100)) * item.quantity}</Typography>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                                            <Button variant="outlined" sx={{ flex: 1, py: 2, borderRadius: '16px', fontWeight: 700 }} onClick={handleBack}>Back</Button>
                                            <Button variant="contained" sx={{ flex: 2, py: 2, borderRadius: '16px', bgcolor: '#6366f1', fontWeight: 800 }} onClick={handleNext}>Continue to Payment</Button>
                                        </Stack>
                                    </motion.div>
                                )}

                                {activeStep === 2 && (
                                    <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                                            <Avatar sx={{ bgcolor: '#ec4899' }}><Payment /></Avatar>
                                            <Typography variant="h5" sx={{ fontWeight: 800 }}>Payment Options</Typography>
                                        </Stack>
                                        <FormControl fullWidth>
                                            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                                {['cod', 'card', 'upi'].map((method) => (
                                                    <Paper key={method} elevation={0} variant="outlined" sx={{ mb: 2, p: 2, borderRadius: '16px', border: paymentMethod === method ? '2px solid #6366f1' : '1px solid #f1f3f6', bgcolor: paymentMethod === method ? '#fff' : 'transparent' }}>
                                                        <FormControlLabel value={method} control={<Radio color="primary" />} label={
                                                            <Typography sx={{ fontWeight: 700, ml: 1, textTransform: 'uppercase' }}>
                                                                {method === 'cod' ? 'Cash on Delivery' : method === 'card' ? 'Credit / Debit Card' : 'UPI Payment'}
                                                            </Typography>
                                                        } />
                                                    </Paper>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                                            <Button variant="outlined" sx={{ flex: 1, py: 2, borderRadius: '16px', fontWeight: 700 }} onClick={handleBack}>Back</Button>
                                            <Button 
                                                variant="contained" 
                                                disabled={status === 'loading'}
                                                sx={{ flex: 2, py: 2, borderRadius: '16px', bgcolor: '#fb641b', fontWeight: 800 }} 
                                                onClick={handleOrder}
                                            >
                                                {status === 'loading' ? <CircularProgress size={24} color="inherit" /> : `Finish & Pay ₹${Math.round(totalAmount)}`}
                                            </Button>
                                        </Stack>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #f1f3f6', position: 'sticky', top: '100px' }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Price Details</Typography>
                            <Stack spacing={2.5}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="text.secondary">Subtotal ({totalItems} items)</Typography>
                                    <Typography sx={{ fontWeight: 700 }}>₹{Math.round(totalAmount)}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="text.secondary">Shipping</Typography>
                                    <Typography color="#10b981" sx={{ fontWeight: 800 }}>FREE</Typography>
                                </Box>
                                <Divider sx={{ borderStyle: 'dashed' }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 800 }}>Total</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#6366f1' }}>₹{Math.round(totalAmount)}</Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

const inputStyles = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '16px',
        bgcolor: '#f8fafc'
    }
};