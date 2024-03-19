import Table from 'react-bootstrap/Table';

interface BasicTableProps<T> {
  TableHeadList: string[];
  dataList: T[];
}

function BasicTable<T>({ thead, dataList }: BasicTableProps<T>) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {TableHeadList.map((head, index) => (
            <th key={index}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataList.map((data, index) => (
          <tr key={index}>
            {Object.values(data).map((value, idx) => (
              <td key={idx}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default BasicTable;
