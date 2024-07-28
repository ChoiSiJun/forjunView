import * as React from 'react';
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
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface MirCodeNameListItem {
  key: string | number;
  code: string | number;
  name_ko: string;
}

export interface CodeNameListState {
  codeNameList: MirCodeNameListItem[];
}

export interface CodeNameListProps extends CodeNameListState {
  onListClick: (key: string | number) => void;
  onCreateClick: () => void;
  onModifyClick: (key: string | number) => void;
  onDeleteClick?: (key: string | number) => void;
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
    key: string | number,
    HandleListClick: (key: string | number) => void,
  ) => {
    setSelectedIndex(index);

    // 리스트 클릭 callback 이벤트
    HandleListClick(key);
  };

  // 삭제 Event Handler
  const handleListItemDeleteClick = (
    index: number,
    key: string | number,
    propDeleteClickEvent: (key: string | number) => void,
  ) => {
    setSelectedIndex(index);

    onListClick(key);

    propDeleteClickEvent(key);
  };

  // 수정 Event Handler
  const handleListItemUpdateClick = (
    index: number,
    key: string | number,
    propUpdateClickEvent: (key: string | number) => void,
  ) => {
    setSelectedIndex(index);

    onListClick(key);

    propUpdateClickEvent(key);
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
              divider={<Divider />}
              key={codeName.key}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="수정"
                    onClick={() =>
                      handleListItemUpdateClick(
                        index,
                        codeName.key,
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
                          codeName.key,
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
                  handleListItemClick(index, codeName.key, onListClick)
                }
                dense
                key={codeName.code}
              >
                <ListItemText
                  id={codeName.code}
                  primary={
                    <Typography variant="h6">{codeName.code}</Typography>
                  }
                  secondary={
                    <Typography variant="body2">{codeName.name_ko}</Typography>
                  }
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
