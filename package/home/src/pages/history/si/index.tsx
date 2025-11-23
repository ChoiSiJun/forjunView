import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Collapse,
  Divider,
} from '@mui/material';
import SjButton from '@common/ui/elements/button/SjButton';
import { useAppDispatch } from '@store/ReduxHooks';
import { modalOpen } from '@store/slice/ModalSlice';
import Register from '@domain/history/components/Register';
import SjText from '@common/ui/elements/text/SjText';
import useHistory from '@domain/history/hooks/useHistory';

export const SiHistory = () => {
  const dispatch = useAppDispatch();

  /** Hook */
  const { historyList, insertHistory, deleteHistory, formatDate } =
    useHistory('SI');

  /** 확장 상태 */
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const openRegister = () => {
    dispatch(modalOpen(<Register onClick={insertHistory} />));
  };

  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <Box
      p={2}
      sx={{
        maxWidth: '100vw',
        width: '100%',
        overflowX: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {/* 상단 제목 + 등록 버튼 영역 */}
      <Box
        mb={2}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <SjText renderType="title" text="SI History" />
        <SjButton ButtonType="input" buttonName="등록" onClick={openRegister} />
      </Box>

      {/* 구분선 */}
      <Divider sx={{ mb: 3 }} />

      {/* 리스트 */}
      {historyList?.map(history => (
        <Card
          key={history.id}
          sx={{
            mb: 2,
            borderRadius: 3,
            boxShadow: 3,
            width: '100%',
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: 6,
            },
          }}
          onClick={() => toggleExpand(history.id)}
          elevation={expandedId === history.id ? 8 : 3}
          aria-expanded={expandedId === history.id}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleExpand(history.id);
            }
          }}
        >
          <Box textAlign={'right'}>
            <SjButton ButtonType={'confirm'} buttonName={'수정'} />
            <SjButton
              ButtonType={'delete'}
              buttonName={'삭제'}
              onClick={() => {
                deleteHistory({ id: history.id });
              }}
            />
          </Box>

          <CardContent
            sx={{
              px: 3,
              py: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                alignItems: 'center',
                flex: 1,
                minWidth: 0,
              }}
            >
              <SjText
                renderType="title"
                text={history.project}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              />
              <SjText
                renderType="subtitle"
                text={history.subject}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'text.secondary',
                }}
              />
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                whiteSpace: 'nowrap',
                flexShrink: 0,
                minWidth: '120px',
                textAlign: 'right',
              }}
            >
              {formatDate(history.historyStartDate)} ~{' '}
              {formatDate(history.historyEndDate)}
            </Typography>
          </CardContent>

          <Collapse in={expandedId === history.id} timeout="auto" unmountOnExit>
            <Box
              sx={{
                px: 3,
                pb: 3,
                pt: 0,
                bgcolor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                width: '100%',
                maxWidth: '100vw',
                wordBreak: 'break-word',
                boxShadow: 'inset 0 0 8px rgba(0,0,0,0.05)',
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                sx={{ mt: 3, mb: 3 }}
              >
                {history.historySkill.map((skill, idx) => (
                  <Chip
                    key={idx}
                    label={skill}
                    size="medium"
                    variant="outlined"
                    sx={{
                      bgcolor: 'primary.light',
                      color: 'primary.dark',
                      fontWeight: 'bold',
                    }}
                  />
                ))}
              </Stack>

              <Divider sx={{ mb: 2 }} />

              <SjText
                renderType="text"
                text={history.description || '설명이 없습니다.'}
                sx={{ color: 'text.secondary' }}
              />
            </Box>
          </Collapse>
        </Card>
      ))}
    </Box>
  );
};
