import { Typography } from '@mui/material';

interface ContentTitleProps {
  titleName: string;
}

const ContentTitle = ({ titleName }: ContentTitleProps) => {
  return (
    <Typography variant="h5" fontWeight="bold">
      {titleName}
    </Typography>
  );
};

export default ContentTitle;
