import Button from '@mui/material/Button';

interface ExportButton {
  buttonName: string;
  onClick?: () => void;
}

const ExportButton = ({ buttonName, onClick }: ExportButton) => {
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

export default ExportButton;
