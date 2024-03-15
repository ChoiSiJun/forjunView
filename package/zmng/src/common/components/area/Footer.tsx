import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';

interface FooterProps {
  children: ReactNode;
}

function Footer({ children }: FooterProps) {
  return (
    <footer className="footer">
      <Container fluid>
        <nav>
          <ul>
            <li>
              서울특별시 서초구 사임당로 64 (서초동) 교대벤처타워 3층 미르테크
            </li>
            <li>TEL. 02-522-1280 | FAX. 02-3473-4301</li>
          </ul>
        </nav>
        <div className="copyright">{children}</div>
      </Container>
    </footer>
  );
}

export default Footer;
