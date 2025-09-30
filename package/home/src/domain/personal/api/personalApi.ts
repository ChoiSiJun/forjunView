const authApiBase = '/personal';

export const PERSONAL_API_ENDPOINTS = {
  //자기 소개서 저장
  save: {
    url: authApiBase,
    method: 'POST',
  },

  //프로필 이미지 저장
  saveProfileImage: {
    url: '/profile-image',
    method: 'POST',
  },
};
