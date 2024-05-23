import Button from '@mui/material/Button';
import ButtonProps from '@common/components/atoms/button/ButtonProps';

const UpdateButton = ({ buttonName, ButtonClick }: ButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        ml: 'auto',
        minWidth: '80px',
        margin: '30',
        marginTop: 2,
      }}
      onClick={ButtonClick}
    >
      {buttonName}
    </Button>
  );
};

export default UpdateButton;
