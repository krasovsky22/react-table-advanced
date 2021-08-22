import React, { useCallback } from "react";
import {
  useFilters,
  useSortBy,
  useTable,
  Column,
  UseTableOptions,
} from "react-table";
import { Table } from "reactstrap";
import { LongArrowAltDownIcon, LongArrowAltUpIcon } from "../icons";
import { EditableCell } from "./cells";
import * as Filters from "./filters";

const TableOnSteroids = ({ columns, onDataUpdate, data, ...rest }) => {
  const defaultColumn = React.useMemo(
    () => ({
      Cell: EditableCell,
      Filter: Filters.TextColumnFilter,
    }),
    []
  );

  const updateMyData = useCallback(
    (rowIndex, columnId, value) => {
      // We also turn on the flag to not reset the page
      let needSave = false;
      const newData = data.map((row, index) => {
        if (index === rowIndex) {
          if (data[rowIndex][columnId] !== value) {
            needSave = true;
          }
          return {
            ...data[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      });

      if (needSave) {
        onDataUpdate(newData);
      }
    },
    [data, onDataUpdate]
  );

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
      updateMyData,
    },
    useFilters,
    useSortBy
  );

  // Render the UI for your table
  return (
    <Table {...getTableProps()} {...rest} style={{ tableLayout: "fixed" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="align-middle">
                <div className="d-flex flex-row space-between flex-wrap gap-1">
                  {column?.isSortable && (
                    <div
                      {...(column?.isSortable && column.getSortByToggleProps())}
                    >
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <LongArrowAltDownIcon />
                        ) : (
                          <LongArrowAltUpIcon />
                        )
                      ) : (
                        <>
                          <LongArrowAltDownIcon />
                          <LongArrowAltUpIcon />
                        </>
                      )}
                    </div>
                  )}
                  <div className="flex-grow-1 text-center">
                    {column.render("Header")}
                  </div>
                  {column.canFilter ? column.render("Filter") : null}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

TableOnSteroids.Filters = Filters;

export default TableOnSteroids;
