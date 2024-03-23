import Table from 'react-bootstrap/Table';
import { TableFieldProps, TableDataProps } from '@common_type';

interface BasicTableProps {
  tableFieldList: TableFieldProps[];
  dataList: TableDataProps[];
}

function BasicTable({ tableFieldList, dataList }: BasicTableProps) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {tableFieldList.map((tableField, index) => (
            <th key={index}>{tableField.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataList.map((data, index) => (
          <tr key={index}>
            {tableFieldList.map((tableField, index) => (
              <td key={index}>{data[tableField.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default BasicTable;
