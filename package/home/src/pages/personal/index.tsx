import { Box } from '@mui/material';

import SjButton from '@common/ui/elements/button/SjButton';
import CompanyForm from './components/CompanyForm';
import AwardForm from './components/AwardForm';
import SkillForm from './components/SkillForm';
import { usePersonal } from '../../domain/personal/hooks/usePersonal';
import BasicForm from './components/BasicForm';

const Personal = () => {
  const personalHook = usePersonal();

  return (
    <form onSubmit={personalHook.formik.handleSubmit}>
      <Box
        sx={{
          p: 3,
          maxWidth: 900,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* 기본 정보 */}
        <BasicForm personalHook={personalHook} />

        {/* 회사 정보 */}
        <CompanyForm personalHook={personalHook} />

        {/* 수상 내역 */}
        <AwardForm personalHook={personalHook} />

        {/* 기술 */}
        <SkillForm personalHook={personalHook} />

        {/* 제출 버튼 */}
        <SjButton ButtonType={'submit'} buttonName={'등록 수정'} />
      </Box>
    </form>
  );
};

export default Personal;
