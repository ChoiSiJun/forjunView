import SjTextField from '@common/components/atoms/input/SjTextField';
import SjList from '@common/components/atoms/text/SjList';
import SjText from '@common/components/atoms/text/SjText';
import {
  Box,
  Divider,
  Grid,
  Stack,
  Paper,
  IconButton,
  Avatar,
} from '@mui/material';
import { useState } from 'react';

export default function PersonalStatementUpdate() {
  const [image, setImage] = useState<string | null>(null);

  // 이미지 선택 이벤트 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          {/* 📌 개인정보 섹션 */}
          <Box>
            <SjText variant="h5" text="개인정보" />
            <Grid container spacing={3} alignItems="center">
              {/* 📌 프로필 이미지 영역 */}
              <Grid
                item
                xs={12}
                md={6}
                lg={6}
                display="flex"
                justifyContent="center"
              >
                <label htmlFor="image-upload">
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  <IconButton component="span">
                    <Avatar
                      src={image || '/default-avatar.png'}
                      sx={{ width: 120, height: 120, cursor: 'pointer' }}
                    />
                  </IconButton>
                </label>
              </Grid>

              {/* 📌 입력 필드 영역 */}
              <Grid item xs={12} md={6} lg={6}>
                <Stack spacing={2}>
                  <SjTextField label="이름" name="name" />
                  <SjTextField label="생년월일" name="birthday" />
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ marginY: 3 }} />

          {/* 📌 회사 정보 섹션 */}
          <Box>
            <SjText variant="h5" text="회사" />
            <Stack spacing={2} marginTop={2}>
              <SjList renderType={'1'} data={{ test: 'test', test2: 'test' }} />

              <SjTextField label="회사명" name="companyName" />
              <SjTextField label="입사일" name="startDay" />
              <SjTextField label="퇴사일" name="endDay" />
            </Stack>
          </Box>

          <Divider sx={{ marginY: 3 }} />

          {/* 📌 스킬 정보 섹션 */}
          <Box>
            <SjText variant="h5" text="스킬" />
            <Stack spacing={2} marginTop={2}>
              <SjTextField label="스킬셋" name="skills" />
            </Stack>
          </Box>

          <Divider sx={{ marginY: 3 }} />

          {/* 📌 자격증 정보 섹션 */}
          <Box>
            <SjText variant="h5" text="자격증" />
            <Stack spacing={2} marginTop={2}>
              <SjTextField label="자격증명" name="certificate" />
            </Stack>
          </Box>

          <Divider sx={{ marginY: 3 }} />

          {/* 📌 수상 정보 섹션 */}
          <Box>
            <SjText variant="h5" text="수상 정보" />
            <Stack spacing={2} marginTop={2}>
              <SjTextField label="수상명" name="award" />
            </Stack>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
