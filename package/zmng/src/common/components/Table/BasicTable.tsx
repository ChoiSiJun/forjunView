import Table from 'react-bootstrap/Table';
import { TableFieldProps } from '@common_type';

interface BasicTableProps<T> {
  fieldList: TableFieldProps[];
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
              <td key={field.key}>{renderFieldByType(field, data)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderFieldByType<T extends Record<string, any>>(
  field: TableFieldProps,
  data: T,
) {
  if (field.type === 'data') {
    return <>{data[field.key]}</>;
  } else if (field.type == 'button') {
    return <>{data[field.key]}</>;
  }
}
export default BasicTable;
