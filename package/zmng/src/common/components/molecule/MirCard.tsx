import * as React from "react"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import { ReactNode } from "react";

interface item {
  component: ReactNode;
}

interface MirCardProps {
  title: string;
  component?: item;
}

const MirCard = ({
  title, 
  component
}:MirCardProps) => {
  return (
    <Card variant="outlined" sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper', borderRadius: '16px' }}>
      <CardHeader 
        title={title}
        subheader="" />
      
      <Divider />
      <CardContent>
        {component}
      </CardContent>
    </Card>
  );
};

export default MirCard;