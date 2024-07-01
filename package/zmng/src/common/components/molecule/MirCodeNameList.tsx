
import * as React from 'react';
import Box from '@mui/material/Box';
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
  key : number;
  name: string;
  code: string;
}

export interface CodeNameListProps {
  codeNameList: MirCodeNameListItem[];
  onModifyClick?: () => void;
  onDeleteClick?: () => void;
}

const MirList = ({
  codeNameList,
  onModifyClick,
  onDeleteClick}:CodeNameListProps) => {

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
          event: React.MouseEvent<HTMLDivElement, MouseEvent>,
          index: number,
        ) => {
          setSelectedIndex(index);
    };

    const createClickHandler = () => {
      alert('생성!!');
    };

  return (
    <>
      <MirButton
        ButtonType={'create'}
        buttonName={'생성'}
        onClick={createClickHandler}
      />
      <List component="nav" aria-label="main mailbox folders">
        {codeNameList.map((codeName) =>
          <ListItemButton
            selected={selectedIndex === codeName.key}
            onClick={(event) => handleListItemClick(event, codeName.key)}
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
    </>
  );
};

export default MirList;