import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';

import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MirButton from '@common/components/atoms/button/MirButton';
import Box from '@mui/material/Box';


interface MirCodeNameListItem {
  // key : number;
  code: string;
  name: string;
}

export interface CodeNameListState {
  codeNameList: MirCodeNameListItem[];
}

export interface CodeNameListProps extends CodeNameListState {
  onListClick:() => void;
  onCreateClick?: () => void;
  onModifyClick?: () => void;
  onDeleteClick?: () => void;
}

const MirList = ({
  codeNameList,
  onListClick,
  onCreateClick,
  onModifyClick,
  onDeleteClick
}:CodeNameListProps) => {

    const dispatch = useAppDispatch();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (
          index: number,
          code: any,
          propClickEvent:() => void
        ) => {
          setSelectedIndex(index);

          // 리스트 클릭 callback 이벤트
          propClickEvent(code);
    };

    // 처음 Load 될때 첫번째 리스트 클릭
    // useEffect(() => {
    //   setSelectedIndex(0);
    // }, []);

  return (
    <>
    <Paper elevation={7} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '8px' }}>
        <Box sx={{ p: 1}}>
          <MirButton
            ButtonType={'create'}
            buttonName={'신규입력'}
            onClick={onCreateClick}
          />
        </Box>
        
        <List component="nav" aria-label="main mailbox folders">
          {codeNameList.map((codeName, index) => {
            return (
              <ListItem
                key={codeName.code}
                secondaryAction={
                  <>
                    <IconButton 
                      edge="end" 
                      aria-label="comments"
                      onClick={onModifyClick}
                    >
                      <EditIcon color="primary"/>
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      aria-label="comments"
                      onClick={onDeleteClick}
                    >
                      <DeleteIcon sx={{ color: '#E33C2F' }}/>
                    </IconButton>
                  </>
                }
                disablePadding
              >
                <ListItemButton role={undefined} 
                  selected={selectedIndex === index}
                  onClick={() => handleListItemClick(index, codeName.code, onListClick)} dense
                  key={codeName.code}
                >
                  <ListItemText id={codeName.code} primary={codeName.name} secondary={codeName.code}/>
                </ListItemButton>
              </ListItem>
             );
          })}
         
        </List>
      </Paper>
    </>
  );
};

export default MirList;