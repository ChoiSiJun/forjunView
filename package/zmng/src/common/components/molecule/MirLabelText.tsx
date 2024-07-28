import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

export interface MirLabelTextProps {
  label: string;
  children: string;
}

const MirLabelText = ({ label, children }: MirLabelTextProps) => {
  return (
    <Stack direction="row" width="100%" p={1} gap={1}>
      <Typography component="dt">
        {label}:
      </Typography>
      <Typography component="dd">
        {children}
      </Typography>
    </Stack>
  );
};

const MirLabelTextList = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack component="dl" divider={<Divider />}>
      {children}
    </Stack>
  );
};

export {MirLabelText, MirLabelTextList};
