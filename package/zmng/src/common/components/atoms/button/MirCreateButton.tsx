import Button from '@mui/material/Button';
import ButtonProps from '@common/components/atoms/button/MirButtonProps';

const MirCreateButton = ({ buttonName, onClick }: ButtonProps) => {
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
      onClick={onClick}
    >
      {buttonName}
    </Button>
  );
};

export default MirCreateButton;
