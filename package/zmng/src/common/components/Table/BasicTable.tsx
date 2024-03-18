import Table from 'react-bootstrap/Table';

interface BasicTableProps {
  thead: React.ReactNode;
  tbody: React.ReactNode;
}

function BasicTable({ thead, tbody }: BasicTableProps) {
  return (
    <Table striped bordered hover>
      {thead}
      {tbody}
    </Table>
  );
}

export default BasicTable;
