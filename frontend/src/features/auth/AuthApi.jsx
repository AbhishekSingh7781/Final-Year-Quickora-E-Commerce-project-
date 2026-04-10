import { API_URL } from "../../constants";

export function createUser(userData) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:5001/auth/signup', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: { 'content-type': 'application/json' },
                credentials: 'include' 
            });
            const data = await response.json();
            if (response.ok) {
                resolve({ data });
            } else {
                reject({ message: data.message || 'Signup failed' });
            }
        } catch (error) {
            reject({ message: error.message });
        }
    });
}

export function loginUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:5001/auth/login', {
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: { 'content-type': 'application/json' },
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                resolve({ data });
            } else {
                reject({ message: data.message || 'Login failed' });
            }
        } catch (error) {
            reject({ message: error.message });
        }
    });
}

export function checkAuth() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:5001/auth/checkAuth', {
                credentials: 'include' // Must include cookie!
            });
            const data = await response.json();
            if (response.ok) {
                resolve({ data });
            } else {
                reject({ message: data.message || 'Not authorized' });
            }
        } catch (error) {
            reject({ message: error.message });
        }
    });
}

export function signOut() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:5001/auth/logout', {
                credentials: 'include'
            });
            if (response.ok) {
                resolve({ data: 'success' });
            } else {
                reject({ message: 'Logout failed' });
            }
        } catch (error) {
            reject({ message: error.message });
        }
    });
}

export function forgotPassword(email) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:5001/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: { 'content-type': 'application/json' },
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                resolve({ data });
            } else {
                reject({ message: data.message || 'Error occurred' });
            }
        } catch (error) {
            reject({ message: error.message });
        }
    });
}

export function resetPassword(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:5001/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'content-type': 'application/json' },
                credentials: 'include'
            });
            const result = await response.json();
            if (response.ok) {
                resolve({ data: result });
            } else {
                reject({ message: result.message || 'Error occurred' });
            }
        } catch (error) {
            reject({ message: error.message });
        }
    });
}
