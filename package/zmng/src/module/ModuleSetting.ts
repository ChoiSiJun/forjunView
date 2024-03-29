import type { MenuProps } from 'antd';

//모듈 정의
const module_list = [
  {
    module_code: 'MEMBER',
    module_name: '이용자관리',
  },

  {
    module_code: 'CMS',
    module_name: 'CMS',
  },

  {
    module_code: 'LMS',
    module_name: 'LMS',
  },

  {
    module_code: 'LAS',
    module_name: 'LAS',
  },
];

//모듈 메뉴 리스트
export const moduleMenuList: MenuProps['items'] = module_list.map(module => {
  return {
    key: module.module_code,
    label: module.module_name,
  };
});
