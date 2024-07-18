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
  name_ko: string;
}

export interface CodeNameListState {
  codeNameList: MirCodeNameListItem[];
}

export interface CodeNameListProps extends CodeNameListState {
  onListClick: (code: string | number) => void;
  onCreateClick: () => void;
  onModifyClick: (code: string | number) => void;
  onDeleteClick?: (code: string | number) => void;
}

const MirCodeNameList = ({
  codeNameList,
  onListClick,
  onCreateClick,
  onModifyClick,
  onDeleteClick,
}: CodeNameListProps) => {
  // const dispatch = useAppDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // 리스트 클릭 Event Handler
  const handleListItemClick = (
    index: number,
    code: string | number,
    propClickEvent: (code: string | number) => void,
  ) => {
    setSelectedIndex(index);

    // 리스트 클릭 callback 이벤트
    propClickEvent(code);
  };

  // 삭제 Event Handler
  const handleListItemDeleteClick = (
    index: number,
    code: string | number,
    propDeleteClickEvent: (code: string | number) => void,
  ) => {
    setSelectedIndex(index);

    onListClick(code);

    propDeleteClickEvent(code);
  };

  // 수정 Event Handler
  const handleListItemUpdateClick = (
    index: number,
    code: string | number,
    propUpdateClickEvent: (code: string | number) => void,
  ) => {
    setSelectedIndex(index);

    onListClick(code);

    propUpdateClickEvent(code);
  };

  return (
    <Paper
      elevation={7}
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        borderRadius: '8px',
      }}
    >
      <Box sx={{ p: 1 }}>
        <MirButton
          ButtonType="create"
          buttonName="신규입력"
          onClick={onCreateClick}
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
                    onClick={() =>
                      handleListItemUpdateClick(
                        index,
                        codeName.code,
                        onModifyClick,
                      )
                    }
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  {onDeleteClick && (
                    <IconButton
                      edge="end"
                      aria-label="삭제"
                      onClick={() =>
                        handleListItemDeleteClick(
                          index,
                          codeName.code,
                          onDeleteClick,
                        )
                      }
                    >
                      <DeleteIcon sx={{ color: '#E33C2F' }} />
                    </IconButton>
                  )}
                </>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                selected={selectedIndex === index}
                onClick={() =>
                  handleListItemClick(index, codeName.code, onListClick)
                }
                dense
                key={codeName.code}
              >
                <ListItemText
                  id={codeName.code}
                  primary={codeName.code}
                  secondary={codeName.name_ko}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default MirCodeNameList;
