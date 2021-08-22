import { FilterIcon } from "../../icons";
import React, { useState } from "react";
import styled from "styled-components";

const FilterComponent = styled.div`
  flex-basis: 100%;
`;

const FilterWrapper = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <div className="my-auto cursor-pointer">
        <FilterIcon onClick={() => setIsOpened((prev) => !prev)} />
      </div>
      {isOpened && <FilterComponent>{children}</FilterComponent>}
    </>
  );
};

export default FilterWrapper;
