import { Portal } from '@mui/base/Portal';

export interface MirModalPortalProps {
  children?: React.ReactNode;
}

const MirModalPortal = ({children}: MirModalPortalProps) => {

  return (
    <Portal container={() => document.getElementById('modal-root')!}>
      {children}
    </Portal>
  );
}

export default MirModalPortal;

