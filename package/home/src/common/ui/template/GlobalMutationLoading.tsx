import { Box, CircularProgress } from '@mui/material';
import { useAppSelector } from 'store/ReduxHooks'; // Redux 상태 가져오는 훅

const GlobalMutationLoading = () => {
  // 💡 Redux store에서 전역 로딩 상태를 가져옵니다.
  const mutationCount = useAppSelector(state => state.Loading.mutationCount);

  const isLoading = mutationCount > 0 ? true : false;

  if (!isLoading) return null; // 로딩 상태가 아니면 아무것도 렌더링하지 않음

  return (
    // 🌟 전체 화면을 덮는 오버레이 스타일
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // 반투명 배경
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // 다른 요소 위에 표시
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default GlobalMutationLoading;
