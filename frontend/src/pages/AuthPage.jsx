import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Stack, 
  IconButton, 
  InputAdornment, 
  useTheme, 
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  EmailOutlined, 
  LockOutlined, 
  PersonOutline,
  ArrowForwardIos
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { 
  loginAsync, 
  signupAsync, 
  selectLoggedInUser, 
  selectAuthError, 
  selectAuthStatus,
  clearAuthError 
} from '../features/auth/AuthSlice';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

// Import our stunning background (assuming it's in the public or assets folder)
// For now, we'll use a placeholder URL and suggest the user to use the generated one
const AUTH_BG = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";

export const AuthPage = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector(selectLoggedInUser);
  const error = useSelector(selectAuthError);
  const status = useSelector(selectAuthStatus);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Authentication failed");
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  // Reset form when switching between login/signup
  useEffect(() => {
    reset();
  }, [isLoginPage, reset]);

  const onSubmit = (data) => {
    if (isLoginPage) {
      dispatch(loginAsync({ email: data.email, password: data.password }));
    } else {
      dispatch(signupAsync({ name: data.name, email: data.email, password: data.password }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
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
        position: 'relative',
        overflow: 'hidden',
        p: 2
      }}
    >
      {/* Animated blobs for extra flair */}
      <Box 
        component={motion.div}
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(99, 102, 241, 0) 70%)',
          borderRadius: '50%',
          zIndex: 0
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={isLoginPage ? 'login' : 'signup'}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ width: '100%', maxWidth: '1000px', zIndex: 1 }}
        >
          <Paper 
            elevation={0}
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              borderRadius: '24px',
              overflow: 'hidden',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            {/* Left Brand Panel */}
            <Box 
              sx={{ 
                width: { xs: '100%', md: '45%' }, 
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                p: { xs: 4, md: 6 },
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800, 
                  letterSpacing: '-0.02em', 
                  mb: 2,
                  fontFamily: "'Outfit', sans-serif" 
                }}
              >
                Quickora
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400, mb: 4 }}>
                {isLoginPage 
                  ? "Welcome back! Please enter your details to access your account." 
                  : "Join our community! Experience the next generation of e-commerce."}
              </Typography>
              
              <Stack spacing={2} sx={{ mt: 4 }}>
                {[
                  "Premium Quality Products",
                  "Fast & Secure Delivery",
                  "24/7 Customer Support"
                ].map((text, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'white' }} />
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>{text}</Typography>
                  </Box>
                ))}
              </Stack>

              <Box sx={{ mt: 'auto', pt: 6 }}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {isLoginPage ? "New here?" : "Already have an account?"}
                </Typography>
                <Button 
                  component={Link} 
                  to={isLoginPage ? '/signup' : '/login'}
                  variant="outlined" 
                  endIcon={<ArrowForwardIos sx={{ fontSize: '12px !important' }} />}
                  sx={{ 
                    mt: 1, 
                    color: 'white', 
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: '12px',
                    px: 3,
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  {isLoginPage ? "Create an account" : "Sign In"}
                </Button>
              </Box>
            </Box>

            {/* Right Form Panel */}
            <Box 
              sx={{ 
                flex: 1, 
                p: { xs: 4, md: 6 },
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 1, 
                  color: '#1e293b',
                  fontFamily: "'Outfit', sans-serif" 
                }}
              >
                {isLoginPage ? "Login" : "Sign Up"}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                Please fill in the information below
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={3}>
                  {!isLoginPage && (
                    <TextField
                      fullWidth
                      label="Full Name"
                      placeholder="John Doe"
                      {...register("name", { required: "Name is required" })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutline sx={{ color: '#94a3b8' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={inputStyles}
                    />
                  )}

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

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register("password", { 
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" }
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined sx={{ color: '#94a3b8' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={inputStyles}
                  />

                  {isLoginPage && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography 
                        component={Link} 
                        to="/forgot-password" 
                        variant="body2" 
                        sx={{ 
                          color: '#6366f1', 
                          textDecoration: 'none', 
                          fontWeight: 600,
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        Forgot password?
                      </Typography>
                    </Box>
                  )}

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
                      boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)',
                      background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
                        boxShadow: '0 20px 25px -5px rgba(99, 102, 241, 0.4)',
                      }
                    }}
                  >
                    {status === 'loading' ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      isLoginPage ? "Sign In" : "Create Account"
                    )}
                  </Button>

                  {isLoginPage && (
                    <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                      <Button 
                        type="button"
                        fullWidth 
                        variant="outlined" 
                        onClick={() => dispatch(loginAsync({ email: 'user@example.com', password: 'password123' }))}
                        sx={{ 
                            color: '#10b981', 
                            borderColor: '#10b981',
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: 'rgba(16, 185, 129, 0.04)', borderColor: '#10b981' }
                        }}
                      >
                        Customer
                      </Button>
                      <Button 
                        type="button"
                        fullWidth 
                        variant="outlined" 
                        onClick={() => dispatch(loginAsync({ email: 'admin@example.com', password: 'password123' }))}
                        sx={{ 
                            color: '#f43f5e', 
                            borderColor: '#f43f5e',
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: 'rgba(244, 63, 94, 0.04)', borderColor: '#f43f5e' }
                        }}
                      >
                        Admin
                      </Button>
                    </Stack>
                  )}
                </Stack>
              </form>

              <Box sx={{ mt: 'auto', pt: 4, textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </AnimatePresence>
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
