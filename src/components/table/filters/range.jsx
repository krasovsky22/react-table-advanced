import React from "react";
import FilterWrapper from "./wrapper";
import { Input } from "reactstrap";

const RangeColumnFilter = ({
  column: { filterValue = [], setFilter },
  ...rest
}) => {
  return (
    <FilterWrapper>
      <div className="d-flex flex-row justify-content-between">
        <Input
          value={filterValue[0] || ""}
          bsSize="sm"
          style={{ width: "40%" }}
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [val ?? undefined, old[1]]);
          }}
          {...rest}
        />
        <div className="align-self-center font-weight-light">to</div>
        <Input
          value={filterValue[1] || ""}
          bsSize="sm"
          style={{ width: "40%" }}
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [old[0], val ?? undefined]);
          }}
          {...rest}
        />
      </div>
    </FilterWrapper>
  );
};

export default RangeColumnFilter;
