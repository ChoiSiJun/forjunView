import Table from 'react-bootstrap/Table';
import { FieldListType } from '@common_type';

interface BasicTableProps<T> {
  fieldList: FieldListType[];
  dataList: T[];
}

//제네릭 사용을 위해 any 허용.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BasicTable<T extends Record<string, any>>({
  fieldList,
  dataList,
}: BasicTableProps<T>) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {fieldList.map((content, index) => (
            <th key={index}>{content.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataList.map((data, index) => (
          <tr key={index}>
            {fieldList.map(field => (
              <td key={field.key}>{data[field.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default BasicTable;
