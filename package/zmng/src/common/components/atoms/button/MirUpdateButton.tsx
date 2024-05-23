import Button from '@mui/material/Button';
import MirButtonProps from '@common/components/atoms/button/MirButtonProps';

const MirUpdateButton = ({ buttonName, onClick }: MirButtonProps) => {
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

export default MirUpdateButton;
