//멤버 모듈 Import
import { MemberModule } from '@config/module/MemberModule';

interface moduleInfoProps {
  moduleCode: string;
  moduleName: string;
  data?: moduleMenuProps[];
}

interface moduleMenuProps {
  menuCode: string;
  menuName: string;
  menuPath: string;
  children?: {
    menuCode: string;
    menuName: string;
  }[];
}

//모듈 정의 ( 사용권한에 따라 오픈 )
const moduleInfo: moduleInfoProps[] = [
  {
    moduleCode: 'MEMBER',
    moduleName: '이용자관리',
    data: MemberModule,
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
