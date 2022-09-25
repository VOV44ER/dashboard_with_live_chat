import React, { useState } from 'react';
import {
  DataGrid,
  GridRowsProp,
  GridColumns,
} from '@mui/x-data-grid';
import { HeaderTableGrid } from '../HeaderTableGrid/HeaderTableGrid';
import {
  BoxGridStyled,
  BoxTableWrapperStyled,
  TitleStyled,
} from './stylesDataGridTable';

interface DataGridTableProps {
  title?: string;
  button: React.FC;
  rows: GridRowsProp;
  columns: GridColumns;
  sortBy: string;
  withTabs?: boolean;
  checkboxSelection?: boolean;
}

export const DataGridTable: React.FC<DataGridTableProps> = ({
  title,
  button,
  rows,
  columns,
  sortBy,
  withTabs = false,
  checkboxSelection = false,
}) => {
  const [pageSize, setPageSize] = useState<number>(10);
  return withTabs ? (
    <>
      <HeaderTableGrid CustomButton={button} />
      <BoxTableWrapperStyled>
        <DataGrid
          autoHeight
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 25, 50, 100]}
          pagination
          checkboxSelection={checkboxSelection}
          rows={rows}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: sortBy, sort: 'desc' }],
            },
          }}
        />
      </BoxTableWrapperStyled>
    </>
  ) : (
    <BoxGridStyled>
      <TitleStyled variant="h4">{title}</TitleStyled>
      <HeaderTableGrid CustomButton={button} />
      <BoxTableWrapperStyled>
        <DataGrid
          autoHeight
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 25, 50, 100]}
          pagination
          rows={rows}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: sortBy, sort: 'desc' }],
            },
          }}
        />
      </BoxTableWrapperStyled>
    </BoxGridStyled>
  );
};
