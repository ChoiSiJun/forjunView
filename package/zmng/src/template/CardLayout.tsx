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

interface item {
  note?: string;
  component: ReactNode;
  copyCode?: undefined | string;
}

interface CardLayout {
  component: item[];
  title: string;
  copyCode?: string;
  requireNote: string[];
  optionNote: string[];
}

const CardLayout = ({
  component,
  title,
  requireNote,
  optionNote,
  copyCode,
}: CardLayout) => {
  return (
    <Card sx={{ height: 500, display: 'flex', flexDirection: 'column' }}>
      <Box borderBottom={1} padding={2}>
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Box
        sx={{
          overflowY: 'auto',
          flex: 1, // 남은 공간을 채우도록 설정
          textAlign: 'center',
          padding: 1,
        }}
      >
        {component.map((item, index) => (
          <Box margin={5} key={index}>
            <Typography variant="h5">{item.note}</Typography>
            <br />
            <Box marginBottom={5}>{item.component}</Box>
            <Box
              marginBottom={5}
              display={item.copyCode == undefined ? 'none' : 'block'}
            >
              <Button
                size="small"
                onClick={() => {
                  handleCopyClick(
                    item.copyCode !== undefined ? item.copyCode : '',
                  );
                }}
              >
                Copy
              </Button>
            </Box>
            <Divider></Divider>
          </Box>
        ))}
      </Box>

      <CardContent sx={{ height: 50, overflowY: 'auto' }}>
        <Typography variant="inherit" color="text.primary">
          필수값
        </Typography>
        <Divider variant="fullWidth" sx={{ border: 1 }} />
        <Typography variant="body2" color="text.secondary">
          {requireNote.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </Typography>
        <br />
        <Typography variant="inherit" color="text.primary">
          옵션값
        </Typography>
        <Divider variant="fullWidth" sx={{ border: 1 }} />
        <Typography variant="body2" color="text.secondary">
          {optionNote.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            handleCopyClick(copyCode !== undefined ? copyCode : '');
          }}
        >
          Copy
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardLayout;
