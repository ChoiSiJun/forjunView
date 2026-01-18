import { Box, Avatar, Typography, Paper, Grid, Chip, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import useWebPersonalQuery from '@domain/personal/api/useWebPersonalQuery';
import WepContentBox from '@pages/web/components/WebContentBox';
import SjText from '@common/ui/elements/text/SjText';

const OpenPersonal = () => {
  const { userId } = useParams();
  const personalData = useWebPersonalQuery({ userId: userId || '' }).data;

  if (!personalData) {
    return (
      <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>프로필 정보를 불러올 수 없습니다.</Typography>
      </Box>
    );
  }

  // 기술을 카테고리별로 그룹화
  const groupedSkills = personalData.skills?.reduce(
    (acc, skill) => {
      const category = skill.skillCategory || '기타';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill.skillName);
      return acc;
    },
    {} as Record<string, string[]>,
  );

  return (
    <WepContentBox color="#000" bgColor="#f0f2f5">
      <Box
        sx={{
          width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
          maxWidth: 900,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          py: 4,
        }}
      >
        {/* 기본 정보 */}
        <Paper sx={{ p: 4 }}>
          <SjText text="기본 정보" renderType="title" sx={{ mb: 3 }} />
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={personalData.profileImageUrl || 'https://via.placeholder.com/150'}
                sx={{
                  width: 150,
                  height: 150,
                  mb: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                이름
              </Typography>
              <Typography variant="h6">{personalData.name || '-'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                직무
              </Typography>
              <Typography variant="h6">{personalData.job || '-'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                학력
              </Typography>
              <Typography variant="body1">{personalData.education || '-'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                학점
              </Typography>
              <Typography variant="body1">{personalData.gradePointAverage || '-'}</Typography>
            </Grid>
            {personalData.introduction && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  자기소개
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {personalData.introduction}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>

        {/* 회사 정보 */}
        {personalData.companies && personalData.companies.length > 0 && (
          <Paper sx={{ p: 4 }}>
            <SjText text="회사 정보" renderType="title" sx={{ mb: 3 }} />
            <Stack spacing={2}>
              {personalData.companies.map((company, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 2,
                    bgcolor: '#f8f9fa',
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        회사명
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {company.companyName || '-'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        입사일
                      </Typography>
                      <Typography variant="body1">{company.startDate || '-'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        퇴사일
                      </Typography>
                      <Typography variant="body1">{company.endDate || '-'}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Stack>
          </Paper>
        )}

        {/* 기술 내역 */}
        {groupedSkills && Object.keys(groupedSkills).length > 0 && (
          <Paper sx={{ p: 4 }}>
            <SjText text="기술 내역" renderType="title" sx={{ mb: 3 }} />
            <Stack spacing={3}>
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <Box key={category}>
                  <SjText renderType="subtitle" text={category} sx={{ mb: 1.5 }} />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skills.map((skill, idx) => (
                      <Chip key={idx} label={skill} color="primary" />
                    ))}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        )}

        {/* 자격증 정보 */}
        {personalData.certificates && personalData.certificates.length > 0 && (
          <Paper sx={{ p: 4 }}>
            <SjText text="자격증 정보" renderType="title" sx={{ mb: 3 }} />
            <Stack spacing={2}>
              {personalData.certificates.map((certificate, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 2,
                    bgcolor: '#f8f9fa',
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        자격증명
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {certificate.certificateName || '-'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        취득기관
                      </Typography>
                      <Typography variant="body1">{certificate.certificateAcquisitionOrganization || '-'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        취득일
                      </Typography>
                      <Typography variant="body1">{certificate.certificateAcquisitionDate || '-'}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Stack>
          </Paper>
        )}

        {/* 수상 내역 */}
        {personalData.awards && personalData.awards.length > 0 && (
          <Paper sx={{ p: 4 }}>
            <SjText text="수상 내역" renderType="title" sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {personalData.awards.map((award, idx) => (
                <Chip key={idx} label={award.awardName} color="primary" />
              ))}
            </Box>
          </Paper>
        )}
      </Box>
    </WepContentBox>
  );
};

export default OpenPersonal;
