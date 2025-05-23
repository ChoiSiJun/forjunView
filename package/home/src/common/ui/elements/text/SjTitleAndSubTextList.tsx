import { Box, Typography } from '@mui/material';

interface SjTextListProps {
  data: { [key: string]: string[] };
  titleDisplay?: boolean;
  renderType?: '1';
  separator?: string;
}

const SjTitleAndSubTextList = ({
  data,
  titleDisplay = true,
  renderType = '1',
  separator = ', ',
}: SjTextListProps) => {
  switch (renderType) {
    case '1':
      return Object.entries(data).map(([key, data]) => (
        <Box key={key} sx={{ mb: 3 }}>
          {/* 리스트 제목*/}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 1,
              display: titleDisplay ? 'block' : 'none',
            }}
          >
            {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
          </Typography>

          <Typography variant="body1">
            {data.map((value, index) => (
              <span key={index}>
                {value}
                {index < data.length - 1 && separator}
              </span>
            ))}
          </Typography>
        </Box>
      ));

    default:
      break;
  }
};

export default SjTitleAndSubTextList;
