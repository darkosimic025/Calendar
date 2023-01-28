import React, { forwardRef, Key, ReactElement, ReactNode, Ref, RefObject } from "react";
import styled from "styled-components";

interface TableProps<T> {
  id: string;
  items: T[];
  columns: {
    field: string;
    name: string;
    render: (item: T) => ReactNode | ReactElement;
  }[];
  ref: RefObject<HTMLTableElement>;
}

const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-left : rgb(218,220,224) 1px solid;
`;

const StyledThead = styled.thead`
  border: none;
`;

const StyledTbody = styled.tbody`
  width: 100%;
  border: none;
`;

const StyledTh = styled.th`
  overflow: hidden;
  border: none;
  border-bottom : rgb(218,220,224) 1px solid;
`;

const StyledTd = styled.td`
  overflow: hidden;
  border: none;
  border-right : rgb(218,220,224) 1px solid;
`;

const StyledTr = styled.tr`
  border-bottom: rgb(218, 220, 224) 1px solid;
`;

const TableComponent = <T extends { [key: string]: any }>(
  { items, columns, id }: TableProps<T>,
  ref: Ref<HTMLTableElement>
) => {
  return (
    <StyledTable ref={ref} id={id}>
      <StyledThead>
        <tr>
          {columns.map((column) => (
            <StyledTh key={column.field}>{column.name}</StyledTh>
          ))}
        </tr>
      </StyledThead>
      <StyledTbody>
        {items.map((item, index) => (
          <StyledTr key={index}>
            {columns.map((column) => (
              <StyledTd key={column.field}>
                {column.render({ ...item[column.field] })}
              </StyledTd>
            ))}
          </StyledTr>
        ))}
      </StyledTbody>
    </StyledTable>
  );
};

const Table = React.forwardRef(TableComponent) as <
  T extends { [key: string]: any }
>(
  { items, columns, id }: TableProps<T>,
  ref: Ref<HTMLTableElement>
) => ReactElement;

export default Table;
