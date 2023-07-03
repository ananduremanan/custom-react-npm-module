import React, { useMemo } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  PageSettingsModel,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { DataUtil } from "@syncfusion/ej2-data";

// Declare the expected props for the Grid component
interface GridProps {
  pageSize?: number;
  dataSource?: any[];
  allowPaging?: boolean;
  columns?: any[] | undefined;
  columnName?: string;
  className?: string;
}

// Define the MultiSelectDropdown component
export const Grid: React.FC<GridProps> = ({
  pageSize,
  dataSource,
  allowPaging,
  columns = [],
  columnName,
  className,
}) => {
  // initializes an empty string array that will contain the column values
  const drop = useMemo(() => {
    // populates the drop array with unique values from the columnName property of dataSource
    if (dataSource && columnName) {
      return DataUtil.distinct(dataSource, columnName) as string[];
    }
    return [];
  }, [dataSource, columnName]);

  const pageSettings: PageSettingsModel = { pageSize: pageSize };

  return (
    // {/* generates the columns of the grid */}
    <GridComponent
      dataSource={dataSource}
      allowPaging={allowPaging}
      pageSettings={pageSettings}
      className={className}
    >
      <ColumnsDirective>
        {columns.map((column) =>
          // if column.template exists, set the template property in ColumnDirective
          column.template ? (
            <ColumnDirective
              key={column.field}
              width={column.width}
              textAlign={column.textAlign}
              headerText={column.headerText}
              template={column.template}
            />
          ) : (
            <ColumnDirective // otherwise, set other required properties in ColumnDirective
              key={column.field}
              field={column.field}
              width={column.width}
              textAlign={column.textAlign}
              format={column.format}
              headerText={column.headerText}
            />
          )
        )}
      </ColumnsDirective>
      {/* enables page, sort, filter, and group functionalities */}
      <Inject services={[Page, Sort, Filter, Group]} />
    </GridComponent>
  );
};