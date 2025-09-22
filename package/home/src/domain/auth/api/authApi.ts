const authApiBase = '/user';

export const USER_API_ENDPOINTS = {
  //ID 중복 체크
  duplicateCheckId: {
    url: authApiBase + '/duplicate',
    method: 'GET',
  },

  //회원가입
  join: {
    url: authApiBase,
    method: 'POST',
  },

  login: {
    url: authApiBase + '/login',
    method: 'POST',
  },
};
