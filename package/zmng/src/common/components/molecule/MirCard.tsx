import * as React from "react"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

interface MirCardProps {
  title: string;
  children?: React.ReactNode;
}

const MirCard = ({
  title, 
  children
}:MirCardProps) => {
  return (
    <Card variant="outlined" sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper', borderRadius: '12px' }}>
      <CardHeader 
        title={title}
        subheader="" />
      
      <Divider />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default MirCard;