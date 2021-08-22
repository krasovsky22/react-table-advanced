import React from "react";
import RangeColumnFilter from "./range";

const decimalCount = (num) => {
  // Convert to String
  const numStr = String(num);
  // String Contains Decimal
  if (numStr.includes(".")) {
    return numStr.split(".")[1].length;
  }
  // String Does Not Contain Decimal
  return 0;
};

const NumberRangeColumnFilter = ({ column }) => {
  const { preFilteredRows, id } = column;
  const [min, max, decimals] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let decimals = 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
      decimals = Math.max(decimalCount(row.values[id]), decimals);
    });
    return [min, max, decimals];
  }, [id, preFilteredRows]);

  const step = React.useMemo(() => {
    if (decimals === 0) {
      return 1;
    }
    return "0." + new Array(decimals - 1).fill("0").join("") + "1";
  }, [decimals]);

  return <RangeColumnFilter column={column} step={step} type="number" />;
};

export default NumberRangeColumnFilter;
