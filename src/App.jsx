import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";

import { Container, Input, Row, Col } from "reactstrap";
import TableOnSteroids from "./components/table";
import styled from "styled-components";
import generateData from "./generateData";

import "bootstrap/dist/css/bootstrap.min.css";

const EditableInput = styled(Input)`
  padding: 1rem;
`;

const AppContainer = styled(Container)`
  min-height: 100vh;
  padding: 2%;
`;

const data = generateData(10);

function filterDateBetween(rows, id, filterValue) {
  let start,
    end = null;
  if (filterValue[0]) {
    start = Date.parse(filterValue[0]);
  }

  if (filterValue[1]) {
    end = Date.parse(filterValue[1]);
  }

  return rows.filter((row) => {
    const rowValue = Date.parse(row.values[id]);
    let passed = true;
    if (start) {
      passed = rowValue >= start;
      if (!passed) {
        return false;
      }
    }

    if (end) {
      passed = rowValue <= end;
    }
    return passed;
  });
}

const App = () => {
  const [updatedData, setUpdatedData] = useState(data);

  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "first_name",
        isSortable: true,
      },
      {
        Header: "Last Name",
        accessor: "last_name",
        isSortable: true,
        isEditable: true,
        editableCell: ({ onChange, ...rest }) => (
          <EditableInput
            onChange={(event) => onChange(event.target.value)}
            {...rest}
          />
        ),
      },
      {
        Header: "Date Of  Birth",
        accessor: "date_of_birth",
        Filter: TableOnSteroids.Filters.DateRangeColumnFilter,
        filter: filterDateBetween,
        isSortable: true,
        isEditable: true,
        editableCell: ({ onChange, ...rest }) => {
          return (
            <EditableInput
              type="date"
              onChange={(event) => {
                onChange(event.target.value);
              }}
              {...rest}
            />
          );
        },
      },
      {
        Header: "Phone",
        accessor: "phone",
        isSortable: true,
        isEditable: true,
        editableCell: ({ onChange, ...rest }) => (
          <EditableInput
            onChange={(event) => onChange(event.target.value)}
            {...rest}
          />
        ),
      },
      {
        Header: "Email",
        accessor: "email",
        isSortable: true,
        isEditable: true,
        editableCell: ({ onChange, ...rest }) => (
          <EditableInput
            onChange={(event) => onChange(event.target.value)}
            {...rest}
          />
        ),
      },
    ],
    []
  );

  return (
    <AppContainer fluid>
      <Row>
        <Col>
          <TableOnSteroids
            bordered
            responsive
            columns={columns}
            data={updatedData}
            onDataUpdate={setUpdatedData}
          />
        </Col>
      </Row>
    </AppContainer>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
