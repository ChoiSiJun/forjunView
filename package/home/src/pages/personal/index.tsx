import { Avatar, Box, Collapse, Grid } from '@mui/material';
import { useState } from 'react';
import profileImage from '@asset/image/jun.jpg'; // @는 보통 src alias (안 되면 상대경로로)
import SjText from '@common/ui/elements/text/SjText';
import SjTitleAndSubTextList from '@common/ui/elements/text/SjTitleAndSubTextList';

//총경력 계산
const TotalEXPERIENCE = (date: string) => {
  const [year, month] = date.split('.').map(Number);
  const startDate = new Date(year, month - 1); // 월은 0부터 시작함
  const today = new Date();

  const totalMonths =
    (today.getFullYear() - startDate.getFullYear()) * 12 +
    (today.getMonth() - startDate.getMonth());

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return `${years}년 ${months}개월`;
};

const profileData = {
  image: 'https://via.placeholder.com/150', // 정사각형 프로필 이미지
  name: '최시준',
  job: 'Software Developer',
  skill: {
    languageSkill: [
      'java',
      'MarkUp(Html,JSP)',
      'React',
      'JavaScript',
      'TypeScript',
      'Jquery',
      'CachaDatabase',
      'Lucene (Solr, Elasticsearch)',
      'Git',
    ],
    frameWorkSkill: [
      'Spring',
      'SpringBoot',
      'Spring Security',
      'Spring cloud',
      'Spring Batch',
      'JPA',
    ],
    dbSkill: ['Oracle', 'Tibero', 'MariaDB', 'MSSQL', 'CacheDB', 'Redis'],
    toolSKill: ['Eclipse', 'IntelliJ', 'Git', 'Svn', 'Docker'],
  },

  reference: {
    company: ['(주)미르테크 ( 2019.09 ~ )'],
    experience: [TotalEXPERIENCE('2019.09')],
    awards: [
      '우수논문상 ( 매장 어플리케이션에 대한 고찰 )',
      '서일대학교 수석졸업',
      '서일대학교 공로상',
    ],
  },
};

const Personal = () => {
  const [openSkills, setOpenSkills] = useState(false); // 스킬 영역 펼침/접힘 상태 관리
  const toggleSkills = () => {
    setOpenSkills(!openSkills);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center">
        {/* 왼쪽 이미지 - 가운데 정렬 */}
        <Grid item xs={12} sm={4} md={3} display="flex" justifyContent="center">
          <Avatar
            src={profileImage}
            alt={profileData.name}
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: 150,
              borderRadius: 2,
            }}
          />
        </Grid>

        {/* 오른쪽 텍스트 */}
        <Grid item xs={12} sm={8} md={9}>
          <Box>
            <Box sx={{ mb: 2 }}>
              <SjText text={profileData.name} variant="h5" component="div" />
              <SjText text={profileData.job} variant="subtitle1" />
              <SjText onClick={toggleSkills} text="(Skill)" renderType="link" />
            </Box>

            {/* 스킬 섹션 - Collapse로 숨기기 */}
            <Collapse in={openSkills}>
              <Box
                sx={{
                  mb: 2,
                  backgroundColor: '#f0f0f0', // 배경 색
                  borderRadius: '8px', // 모서리 둥글게
                  padding: '16px', // 내부 여백
                  boxShadow: 2, // 그림자 효과
                  transition: 'all 0.3s ease', // 부드러운 전환 효과
                  '&:hover': {
                    // hover 시 효과
                    boxShadow: 4, // hover 시 그림자 깊이 증가
                  },
                }}
              >
                <SjTitleAndSubTextList data={profileData.skill} />
              </Box>
            </Collapse>
          </Box>

          {/* 추가 정보들 */}
          <SjTitleAndSubTextList data={profileData.reference} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Personal;
