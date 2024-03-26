import Table from 'react-bootstrap/Table';

import React, { ReactNode } from 'react';

interface BasicTableProps {
  children: ReactNode;
}

function BasicTable({ children }: BasicTableProps) {
  return (
    <Table striped bordered hover>
      {children}
    </Table>
  );
}
export default BasicTable;
