import React, { useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signupAsync, selectLoggedInUser, selectAuthError, clearAuthError } from '../features/auth/AuthSlice';
import { toast } from 'react-toastify';

import { Footer } from '../features/common/Footer';

export const SignupPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
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
      dispatch(signupAsync({ name: data.name, email: data.email, password: data.password }));
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
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>Sign Up</Typography>
          <Typography variant="body1" sx={{ color: '#dbdbdb', fontSize: '18px', lineHeight: 1.5 }}>
            We provide the best products and fast delivery services
          </Typography>
          <Box sx={{ mt: 'auto', textAlign: 'center', pt: 10, display: { xs: 'none', md: 'block' } }}>
             <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="signup illustration" style={{ width: '100%' }} />
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
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField 
                label="Full Name" 
                variant="standard" 
                fullWidth 
                InputLabelProps={{ style: { color: '#878787' } }} 
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
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
                label="Set Password" 
                type="password"
                variant="standard" 
                fullWidth 
                InputLabelProps={{ style: { color: '#878787' } }} 
                {...register("password", { 
                    required: "Password is required",
                    pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: "At least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number"
                    }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <TextField 
                label="Confirm Password" 
                type="password"
                variant="standard" 
                fullWidth 
                InputLabelProps={{ style: { color: '#878787' } }} 
                {...register("confirmPassword", { 
                    required: "Confirm Password is required",
                    validate: (value, formValues) => value === formValues.password || "Password not matching"
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
              
              <Typography variant="caption" sx={{ color: '#878787', fontSize: '12px', mt: 1 }}>
                By continuing, you agree to Quickora's Terms of Use and Privacy Policy.
              </Typography>

              <Button type="submit" variant="contained" sx={{ 
                backgroundColor: '#fb641b', 
                color: 'white', 
                boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)',
                py: 1.5,
                fontWeight: 'bold',
                borderRadius: '2px',
                '&:hover': { backgroundColor: '#e65100' },
                mt: 2
              }}>
                CONTINUE
              </Button>
              <Button component={Link} to="/login" variant="text" sx={{ 
                color: '#2874f0', 
                fontWeight: 'bold', 
                boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)',
                backgroundColor: 'white',
                py: 1.5,
                borderRadius: '2px',
                textDecoration: 'none'
              }}>
                Existing User? Log in
              </Button>
            </Stack>
          </form>
        </Box>
      </Paper>
      </Box>
      <Footer />
    </Box>
  );
};