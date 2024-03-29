import type { MenuProps } from 'antd';

export const MemberModule: MenuProps['items'] = [
  {
    key: 'MEMBER_LIST',
    label: '이용자 리스트',
    children: [
      {
        key: 'MEMBER_LIST_SEARCH',
        label: '검색',
      },

      {
        key: 'MEMBER_LIST_INSERT',
        label: '반입',
      },
    ],
  },
  {
    key: 'MEMBER_LIMIT',
    label: '서비스 제한 ',
    children: [
      {
        key: 'MEMBER_LIMIT_SEARCH',
        label: '검색',
      },

      {
        key: 'MEMBER_LIMIT_INSERT',
        label: '규정 관리',
      },
    ],
  },
  {
    key: 'MEMBER_REPORT',
    label: '리포트',
    children: [
      {
        key: 'MEMBER_REPORT_JOIN',
        label: '가입 통계',
      },

      {
        key: 'MEMBER_REPORT_CONNECT',
        label: '접속 통계',
      },
    ],
  },
];
