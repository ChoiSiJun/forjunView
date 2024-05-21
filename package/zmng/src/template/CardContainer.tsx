import { styled } from '@mui/system';

const StyledCardContainer = styled('div')({
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
  padding: '16px',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2), 0 12px 40px rgba(0, 0, 0, 0.2)',
  },
});

export default StyledCardContainer;
