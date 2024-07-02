import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import MirButton, {
  MirButtonGuide,
} from '@common/components/atoms/button/MirButton';

interface MirCodeNameListItem {
  // key : number;
  code: string;
  name: string;
}

export interface CodeNameListState {
  codeNameList: MirCodeNameListItem[];
}

export interface CodeNameListProps extends CodeNameListState {
  onCreateClic?: () => void;
  onModifyClick?: () => void;
  onDeleteClick?: () => void;
}

const MirList = ({
  codeNameList,
  onCreateClick,
  onModifyClick,
  onDeleteClick
}:CodeNameListProps) => {

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
          event: React.MouseEvent<HTMLDivElement, MouseEvent>,
          index: number,
        ) => {
          setSelectedIndex(index);
    };

  return (
    <>
    <Paper elevation={7} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '16px' }}>
      {/* <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '16px' }}> */}
        
        <MirButton
          ButtonType={'create'}
          buttonName={'신규입력'}
          onClick={onCreateClick}
        />
        <List component="nav" aria-label="main mailbox folders">
          {codeNameList.map((codeName, index) =>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
              key={codeName.code}
            >
              <ListItemText primary={codeName.name} secondary={codeName.code} />
              <IconButton aria-label="modify" size="small"  onClick={onModifyClick}>   
                <EditIcon fontSize="small"/>
              </IconButton>
              <IconButton aria-label="delete" size="small"  onClick={onDeleteClick}>   
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </ListItemButton>
          )}
        </List>
        
      {/* </Box> */}
      </Paper>
    </>
  );
};

export default MirList;