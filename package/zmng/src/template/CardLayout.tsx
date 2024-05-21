import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Box, Divider } from '@mui/material';
import { ReactNode } from 'react';

const handleCopyClick = (textToCopy: string) => {
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      alert('코드복사 성공');
    })
    .catch(() => {
      alert('코드복사에 실패하였습니다.');
    });
};

interface CardLayout {
  component: ReactNode;
  title: string;
  note: string[];
  copyCode: string;
}

const CardLayout = ({ component, title, note, copyCode }: CardLayout) => {
  return (
    <Card>
      <Box borderBottom={1} padding={2}>
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Box
        sx={{
          textAlign: 'center', // 수평 가운데 정렬 (텍스트 정렬)
          minHeight: 80, // 최소 높이 설정 (필요에 따라 조절)
          paddingTop: 2, // 상단 여백 설정
          paddingBottom: 2, // 하단 여백 설정
        }}
      >
        {component}
      </Box>
      <Divider></Divider>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {note.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            handleCopyClick(copyCode);
          }}
        >
          Copy
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardLayout;
