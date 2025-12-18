const authApiBase = '/user';

export const USER_API_ENDPOINTS = {
  //ID 중복 체크
  duplicateCheckId: {
    url: '/api/v1' + authApiBase + '/duplicate',
    method: 'GET',
  },

  //회원가입
  join: {
    url: '/api/v1' + authApiBase,
    method: 'POST',
  },

  login: {
    url: '/api/v1' + authApiBase + '/login',
    method: 'POST',
  },
};
