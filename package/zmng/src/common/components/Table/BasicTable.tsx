import Table from 'react-bootstrap/Table';
import { TableFieldProps, TableDataProps } from '@common_type';
import React from 'react';

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
              <td key={index}>{RenderTableData(tableField, data)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );

  function RenderTableData(tableField: TableFieldProps, data: TableDataProps) {
    if (Array.isArray(tableField.buttonArray)) {
      return (
        <>
          {tableField.buttonArray.map((ButtonComponent, index) => (
            <React.Fragment key={index}>{ButtonComponent}</React.Fragment>
          ))}
        </>
      );
    }
    // buttonArray가 없는 경우 해당 키 값 반환
    return data[tableField.key];
  }
}

export default BasicTable;
