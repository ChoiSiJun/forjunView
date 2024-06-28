export const member = [
  {
    moduleCode: 'MEMBER_SEARCH',
    moduleName: '조회',
    modulePath: '/liberty/member',
    menuList: [
      {
        menuCode: 'MEMBER_LIST_SEARCH',
        menuName: '검색',
        menuPath: '/liberty/member',
      },
    ],
  },
  {
    moduleCode: 'MEMBER_MANAGEMENT',
    moduleName: '관리',
    modulePath: '/liberty/dashboard',
    menuList: [
      {
        menuCode: 'MEMBER_MANAGEMENT_LIMIT',
        menuName: '서비스제한',
        menuPath: '/liberty/dashboard',
      },

      {
        menuCode: 'MEMBER_MANAGEMENT_INSERT',
        menuName: '반입',
        menuPath: '/',
      },
    ],
  },
  {
    moduleCode: 'MEMBER_REPORT',
    moduleName: '통계',
    modulePath: '/liberty/',
    menuList: [
      {
        menuCode: 'MEMBER_REPORT_SEARCH',
        menuName: '조회',
        menuPath: '/liberty/',
      },
    ],
  },
];
