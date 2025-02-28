import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
const data = [
  { id: 1, title: 'First Item', description: 'This is the first item' },
  { id: 2, title: 'Second Item', description: 'This is the second item' },
  { id: 3, title: 'Third Item', description: 'This is the third item' },
];
export const SiHistory = () => {
  return (
    <List>
      {data.map(item => {
        return (
          <React.Fragment key={item.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={<Typography variant="h6">{item.title}</Typography>}
                secondary={
                  <Typography variant="body2">{item.description}</Typography>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
};
