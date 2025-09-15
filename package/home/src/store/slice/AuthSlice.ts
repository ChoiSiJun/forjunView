import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export interface AuthProps {
  jwtToken: string;
  userId: string;
  name: string;
  role: string;
  status: string;
  exp: number | null;
}

const initialState: AuthProps = {
  jwtToken: '',
  userId: 'GUEST',
  name: 'GUEST',
  role: 'GUEST',
  status: 'idle',
  exp: null,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //인증값 저장
    authInsert: (state, action) => {
      const jwtToken = action.payload;
      state.jwtToken = jwtToken;

      const decodeJwt: {
        sub: string;
        userName: string;
        authority: string;
        exp: number;
      } = jwtDecode(jwtToken);
      const userId = decodeJwt.sub;
      const name = decodeJwt.userName;
      const role = decodeJwt.authority;
      const exp = decodeJwt.exp;

      if (userId == undefined) {
        state.status = 'fail';
        return;
      }
      state.userId = userId;
      state.name = name;
      state.role = role;
      state.exp = exp;
      state.status = 'success';
    },

    //인증값 삭제
    authDelete: state => {
      state.userId = initialState.userId;
      state.jwtToken = initialState.jwtToken;
      state.name = initialState.name;
      state.role = initialState.role;
      state.status = 'idle';
    },
  },
});

export const { authInsert, authDelete } = AuthSlice.actions;
export default AuthSlice.reducer;
