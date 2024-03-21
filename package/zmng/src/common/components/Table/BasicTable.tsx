import Table from 'react-bootstrap/Table';
import { FieldListProps, ButtonProps } from '@common_type';
import { ButtonComponent } from '@common_components_ui';

interface BasicTableProps<T> {
  fieldList: FieldListProps[];
  dataList: T[];
}

//제네릭 사용을 위해 any 허용.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BasicTable<T extends Record<string, any>>({
  fieldList,
  dataList,
}: BasicTableProps<T>) {
  console.log(dataList);
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderFieldByType<T extends Record<string, any>>(
  field: FieldListProps,
  data: T,
) {
  if (field.type === 'data') {
    return <>{data[field.key]}</>;
  } else if (field.type == 'button') {
    const buttonArray = field?.buttonArray || [];

    // 버튼 컴포넌트를 동적으로 가져와 배열에 담음
    const buttonComponents = buttonArray.map((button, index) => {
      // 버튼 타입에 따라 동적으로 컴포넌트를 가져옴
      const ButtonComponent = ButtonComponents[button.type];
      // ButtonComponent가 존재하면 해당 컴포넌트를 렌더링
      if (ButtonComponent) {
        return (
          <ButtonComponent
            key={index}
            label={button.label}
            onClick={button.onClick}
          />
        );
      }
      // 버튼 타입이 없을 경우 렌더링할 컴포넌트가 없으므로 null 반환
      return null;
    });
  }
}
export default BasicTable;
