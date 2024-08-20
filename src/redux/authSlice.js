import { createSlice } from '@reduxjs/toolkit';
import { user } from '../utils/auth';

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  error: null,  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { email, password } = action.payload;
      if (email === user.email && password === user.password) {
        state.isAuthenticated = true;
        state.user = { username: user.username };
        state.error = null; 
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({ username: user.username }));
      } else {
        state.isAuthenticated = false;
        state.user = null;
        state.error = 'Invalid email or password'; 
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.removeItem('user');
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null; 
      localStorage.setItem('isAuthenticated', 'false');
      localStorage.removeItem('user');
    },
    setError(state, action) {
      state.error = action.payload; 
    },
  },
});

export const { login, logout, setError } = authSlice.actions;
export default authSlice.reducer;



