import React from "react";
import FilterWrapper from "./wrapper";
import { Input } from "reactstrap";

const TextColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;

  return (
    <FilterWrapper>
      <Input
        bsSize="sm"
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    </FilterWrapper>
  );
};

export default TextColumnFilter;
