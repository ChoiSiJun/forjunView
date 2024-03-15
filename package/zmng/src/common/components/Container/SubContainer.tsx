import { ReactNode } from 'react';
import { Container, ThemeProvider } from 'react-bootstrap';

// SubContainer 자식 인터페이스
interface SubContainerProps {
  children: ReactNode;
}

function SubContainer({ children }: SubContainerProps) {
  return (
    // sm : 스마트폰 ,
    // md : 태블릿
    // lg : PC
    <ThemeProvider breakpoints={['sm', 'md', 'lg']} minBreakpoint="sm">
      <Container>{children}</Container>
    </ThemeProvider>
  );
}
export default SubContainer;
