//멤버 모듈 Import
import { member } from '@common/slice/Member';
import { mymenu } from '@common/slice/MyMenu';
import { Cms } from '@common/slice/Cms';

//모듈 정의 ( 사용권한에 따라 오픈 )
const packageInfo = [
  {
    packageCode: 'MYMENU',
    packageName: 'My Menu',
    moduleList: mymenu,
  },

  {
    packageCode: 'MEMBER',
    packageName: '이용자관리',
    moduleList: member,
  },
  {
    packageCode: 'CMS',
    packageName: 'CMS',
    moduleList: Cms,
  },
  {
    packageCode: 'LMS',
    packageName: 'LMS',
  },
  {
    packageCode: 'LAS',
    packageName: 'LAS',
  },
];

export default packageInfo;
