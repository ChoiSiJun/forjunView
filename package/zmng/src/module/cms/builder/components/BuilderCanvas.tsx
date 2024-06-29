import { Box, Typography } from '@mui/material';

const BuilderCanvas = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: '600px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4">Main Canvas</Typography>
    </Box>
  );
};

export default BuilderCanvas;
