import { Box, CircularProgress } from '@mui/material';
import { useAppSelector } from 'store/ReduxHooks';

interface GlobalLoadingWrapperProps {
  children: React.ReactNode;
}

const GlobalQueryLoadingWrapper = ({ children }: GlobalLoadingWrapperProps) => {
  const globalCount = useAppSelector(state => state.Loading.globalCount);
  const isLoading = globalCount > 0;
  // 로딩 UI (오버레이)
  const overlay = isLoading ? (
    <Box
      sx={{
        // 로딩 중 UI는 계속 보이도록 스타일 유지
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // 반투명 배경
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <CircularProgress size={60} />
    </Box>
  ) : null;

  return (
    <>
      {overlay}
      {children}
    </>
  );
};

export default GlobalQueryLoadingWrapper;
