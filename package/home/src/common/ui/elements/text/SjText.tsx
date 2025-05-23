import { Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TypographyProps } from '@mui/material';

export interface SjTextProps extends TypographyProps {
  text: string;
  renderType?: 'text' | 'link';
  onClick?: () => void;
}

const StyledTypography = styled(Typography)<TypographyProps>(
  ({ theme }) => ({}),
);

const StyledLink = styled(Link)(({ theme }) => ({
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline', // 마우스 오버 시 밑줄 추가
  },
}));

const SjText = ({
  text,
  variant = 'body1',
  component = 'span',
  renderType = 'text',
  onClick,
}: SjTextProps) => {
  switch (renderType) {
    case 'text':
      return (
        <StyledTypography variant={variant} component={component}>
          {text}
        </StyledTypography>
      );
    case 'link':
      return <StyledLink onClick={onClick}>{text}</StyledLink>;
    default:
      break;
  }
};

export default SjText;
