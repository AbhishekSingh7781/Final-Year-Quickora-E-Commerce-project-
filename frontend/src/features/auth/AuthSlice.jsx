import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser, checkAuth, signOut, forgotPassword, resetPassword } from './AuthApi';

const initialState = {
    loggedInUser: null,
    status: 'idle',
    error: null,
    isAuthChecked: false,
    mailSent: false,
    passwordReset: false
};

export const signupAsync = createAsyncThunk(
    'auth/signup',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await createUser(userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (loginInfo, { rejectWithValue }) => {
        try {
            const response = await loginUser(loginInfo);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const checkAuthAsync = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await checkAuth();
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await signOut();
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const forgotPasswordAsync = createAsyncThunk(
    'auth/forgotPassword',
    async (email, { rejectWithValue }) => {
        try {
            const response = await forgotPassword(email);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const resetPasswordAsync = createAsyncThunk(
    'auth/resetPassword',
    async (data, { rejectWithValue }) => {
        try {
            const response = await resetPassword(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signupAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = action.payload;
            })
            .addCase(signupAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = action.payload;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(checkAuthAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkAuthAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(checkAuthAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.isAuthChecked = true;
            })
            .addCase(logoutAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = null;
            })
            .addCase(forgotPasswordAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.mailSent = true;
            })
            .addCase(forgotPasswordAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(resetPasswordAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resetPasswordAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.passwordReset = true;
            })
            .addCase(resetPasswordAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            });
    }
});

export const { clearAuthError } = authSlice.actions;

export const selectLoggedInUser = (state) => state.AuthSlice.loggedInUser;
export const selectAuthStatus = (state) => state.AuthSlice.status;
export const selectAuthError = (state) => state.AuthSlice.error;
export const selectIsAuthChecked = (state) => state.AuthSlice.isAuthChecked;
export const selectMailSent = (state) => state.AuthSlice.mailSent;
export const selectPasswordReset = (state) => state.AuthSlice.passwordReset;

export default authSlice.reducer;
