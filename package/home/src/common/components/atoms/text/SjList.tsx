import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

interface SjListProps {
  renderType: '1';
  data: { [key: string]: string | null | undefined }; // 각 항목의 'primary'와 'secondary' 값을 가질 수 있도록 설정
}

export default function SjList({ renderType = '1', data }: SjListProps) {
  // renderType이 '1'일 경우에만 리스트를 렌더링
  if (renderType === '1') {
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {Object.entries(data).map(([key, value]) => {
          // 각 항목에 대해 primary는 key, secondary는 value로 설정

          return (
            <ListItem key={key}>
              <ListItemText primary={key} secondary={value} />
            </ListItem>
          );
        })}
      </List>
    );
  }

  return null; // renderType이 '1'이 아닌 경우, null을 반환
}
