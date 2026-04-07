import React, { useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, selectLoggedInUser, selectAuthError, clearAuthError } from '../features/auth/AuthSlice';
import { toast } from 'react-toastify';

import { Footer } from '../features/common/Footer';

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectLoggedInUser);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  const onSubmit = (data) => {
    dispatch(loginAsync({ email: data.email, password: data.password }));
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f1f3f6', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', py: 5 }}>
      <Paper sx={{ 
        width: '100%', 
        maxWidth: '850px', 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        borderRadius: '2px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)'
      }}>
        {/* Left Side (Blue Panel) */}
        <Box sx={{ 
          backgroundColor: '#2874f0', 
          width: { xs: '100%', md: '40%' }, 
          padding: 5, 
          color: 'white' 
        }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>Login</Typography>
          <Typography variant="body1" sx={{ color: '#dbdbdb', fontSize: '18px', lineHeight: 1.5 }}>
            Get access to your Orders, Wishlist and Recommendations
          </Typography>
          <Box sx={{ mt: 'auto', textAlign: 'center', pt: 10, display: { xs: 'none', md: 'block' } }}>
             <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="login illustration" style={{ width: '100%' }} />
          </Box>
        </Box>

        {/* Right Side (Auth Form) */}
        <Box sx={{ 
          padding: 5, 
          flex: 1, 
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Stack spacing={3}>
              <TextField 
                label="Enter Email" 
                type="email"
                variant="standard" 
                fullWidth 
                InputLabelProps={{ style: { color: '#878787' } }} 
                {...register("email", { 
                    required: "Email is required",
                    pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: "Email not valid"
                    }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField 
                label="Enter Password" 
                type="password"
                variant="standard" 
                fullWidth 
                InputLabelProps={{ style: { color: '#878787' } }} 
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Typography variant="caption" sx={{ color: '#878787', fontSize: '12px' }}>
                By continuing, you agree to Quickora's Terms of Use and Privacy Policy.
              </Typography>
              <Button type="submit" variant="contained" sx={{ 
                backgroundColor: '#fb641b', 
                color: 'white', 
                boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)',
                py: 1.5,
                fontWeight: 'bold',
                borderRadius: '2px',
                '&:hover': { backgroundColor: '#e65100' }
              }}>
                Login
              </Button>
              <Typography sx={{ textAlign: 'center', color: '#878787', fontSize: '14px' }}>OR</Typography>
              <Button variant="text" sx={{ 
                color: '#2874f0', 
                fontWeight: 'bold', 
                boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)',
                backgroundColor: 'white',
                py: 1.5,
                borderRadius: '2px'
              }}>
                Request OTP
              </Button>

              {/* Quick Test Login Buttons */}
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  onClick={() => dispatch(loginAsync({ email: 'user@example.com', password: 'password123' }))}
                  sx={{ 
                      color: '#4caf50', 
                      borderColor: '#4caf50',
                      '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.04)', borderColor: '#4caf50' }
                  }}
                >
                  Test Customer
                </Button>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  onClick={() => dispatch(loginAsync({ email: 'admin@example.com', password: 'password123' }))}
                  sx={{ 
                      color: '#f44336', 
                      borderColor: '#f44336',
                      '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.04)', borderColor: '#f44336' }
                  }}
                >
                  Test Admin
                </Button>
              </Stack>
            </Stack>

            <Box sx={{ mt: 'auto', textAlign: 'center', pt: 5 }}>
              <Link to="/signup" style={{ textDecoration: 'none', color: '#2874f0', fontWeight: 'bold', fontSize: '14px' }}>
                New to Quickora? Create an account
              </Link>
            </Box>
          </form>
        </Box>
      </Paper>
      </Box>
      <Footer />
    </Box>
  );
};