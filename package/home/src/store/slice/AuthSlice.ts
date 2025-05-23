import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export interface AuthProps {
  jwtToken: string;
  name: string;
  role: string;
}

const initialState: AuthProps = {
  jwtToken: '',
  name: 'GUEST',
  role: 'GUEST',
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //인증값 저장
    authInsert: (state, action) => {
      const jwtToken = action.payload;
      state.jwtToken = jwtToken;

      const decodeJwt = jwtDecode(jwtToken);
      const name = decodeJwt.userName;
      const role = decodeJwt.authority;
      state.name = name;
      state.role = role;
    },

    //인증값 삭제
    authDelete: state => {
      state.jwtToken = initialState.jwtToken;
      state.name = initialState.name;
      state.role = initialState.role;
    },
  },
});

export const { authInsert, authDelete } = AuthSlice.actions;
export default AuthSlice.reducer;
