//멤버 모듈 Import
import { MemberModule } from '@common/slice/MemberModuleData';

//모듈 정의 ( 사용권한에 따라 오픈 )
const moduleInfo = [
  {
    moduleCode: 'MEMBER',
    moduleName: '이용자관리',
    menuList: MemberModule,
  },
  {
    moduleCode: 'CMS',
    moduleName: 'CMS',
  },
  {
    moduleCode: 'LMS',
    moduleName: 'LMS',
  },
  {
    moduleCode: 'LAS',
    moduleName: 'LAS',
  },
];

export default moduleInfo;
