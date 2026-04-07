import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Stack, 
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { 
  EmailOutlined, 
  ArrowBackIosNew,
  CheckCircleOutline
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAsync, selectAuthStatus, selectMailSent } from '../features/auth/AuthSlice';

const AUTH_BG = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";

export const ForgotPasswordPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const mailSent = useSelector(selectMailSent);

  const onSubmit = (data) => {
    dispatch(forgotPasswordAsync(data.email));
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        width: '100vw',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${AUTH_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        p: 2
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <Paper 
          elevation={0}
          sx={{ 
            p: 5,
            borderRadius: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <AnimatePresence mode="wait">
            {!mailSent ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton component={Link} to="/login" sx={{ color: '#6366f1' }}>
                    <ArrowBackIosNew fontSize="small" />
                  </IconButton>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#6366f1' }}>
                    Back to Login
                  </Typography>
                </Box>

                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 1, 
                    color: '#1e293b',
                    fontFamily: "'Outfit', sans-serif" 
                  }}
                >
                  Forgot Password?
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                  Enter your email address and we'll send you a link to reset your password.
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      placeholder="name@example.com"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                          message: "Please enter a valid email"
                        }
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlined sx={{ color: '#94a3b8' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={inputStyles}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={status === 'loading'}
                      sx={{
                        height: '56px',
                        borderRadius: '14px',
                        fontSize: '16px',
                        fontWeight: 600,
                        textTransform: 'none',
                        background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
                          boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)',
                        }
                      }}
                    >
                      {status === 'loading' ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
                    </Button>
                  </Stack>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center' }}
              >
                <CheckCircleOutline sx={{ fontSize: 80, color: '#10b981', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
                  Email Sent!
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                  We've sent a password reset link to your email. Please check your inbox.
                </Typography>
                <Button 
                  component={Link} 
                  to="/login"
                  variant="outlined"
                  fullWidth
                  sx={{ borderRadius: '14px', height: '56px', fontWeight: 600, textTransform: 'none' }}
                >
                  Return to Login
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Paper>
      </motion.div>
    </Box>
  );
};

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '14px',
    backgroundColor: '#f8fafc',
    '& fieldset': { borderColor: '#e2e8f0' },
    '&:hover fieldset': { borderColor: '#cbd5e1' },
    '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: '2px' },
  },
  '& .MuiInputLabel-root': { color: '#64748b' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
};