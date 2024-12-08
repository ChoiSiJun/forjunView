import { createSlice } from '@reduxjs/toolkit';

export interface AuthProps {
  jwtToken: string;
}

const initialState: AuthProps = {
  jwtToken: '',
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    jwtInsert: (state, action) => {
      const jwtToken = action.payload;
      state.jwtToken = jwtToken;
    },
    jwtDelete: state => {
      state.jwtToken = '';
    },
  },
});

export const { jwtInsert, jwtDelete } = AuthSlice.actions;
export default AuthSlice.reducer;
