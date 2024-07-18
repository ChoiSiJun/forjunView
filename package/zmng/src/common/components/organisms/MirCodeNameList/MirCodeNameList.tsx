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
import UseModal from '@hooks/UseModal'; 


interface CodeNameListItem {
  // key : number;
  code: string;
  name_ko: string;
}

export interface CodeNameListItemProps {
  codeNameList: CodeNameListItem[];
}

export interface CodeNameListProps extends CodeNameListItemProps {
  onListClick:() => void;
  createModalType: string;
  modifyModalType: string;
  deleteModalType: string;
}

const MirCodeNameList = ({
  codeNameList,
  onListClick,
  createModalType,
  modifyModalType,
  deleteModalType
}:CodeNameListProps) => {
  const { openModal } = UseModal();
  // const dispatch = useAppDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
        index: number,
        code: string|number,
        propClickEvent:(code:string|number) => void
      ) => {
        setSelectedIndex(index);

        // 리스트 클릭 callback 이벤트
        propClickEvent(code);
  };

  const handleListItemDeleteClick = (
    index: number,
    code: string|number,
    propClickEvent:(code:string|number) => void
  ) => {
    setSelectedIndex(index);

    // 리스트 클릭 callback 이벤트
    propClickEvent(code);

    
};

  const HandleCreateButtonClick = () => {
    openModal({
      type: createModalType, 
    });
  }

  const HandleModifyClick = () => {
    openModal({
      type: modifyModalType, 
    });
  }

  const HandleDeleteClick = () => {
  //  handleListItemClick();

    openModal({
      type: deleteModalType, 
    });
  }

  return (
    <Paper elevation={7} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '8px' }}>
        <Box sx={{ p: 1}}>
          <MirButton
            ButtonType="create"
            buttonName="신규입력"
            onClick={HandleCreateButtonClick}
          />
        </Box>
        
        <List component="nav" aria-label="main mailbox folders">
          {codeNameList?.map((codeName, index) => {
            return (
              <ListItem
                key={codeName.code}
                secondaryAction={
                  <>
                    <IconButton 
                      edge="end" 
                      aria-label="수정"
                      onClick={HandleModifyClick}
                    >
                      <EditIcon color="primary"/>
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      aria-label="삭제"
                      onClick={() => handleListItemDeleteClick(index, codeName.code, HandleDeleteClick)}
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
                  <ListItemText id={codeName.code} primary={codeName.code} secondary={codeName.name_ko}/>
                </ListItemButton>
              </ListItem>
             );
          })}
         
        </List>
      </Paper>
  );
};

export default MirCodeNameList;