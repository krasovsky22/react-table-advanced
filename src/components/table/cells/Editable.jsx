import React, { useCallback, useRef, useState } from "react";
import { useMouse } from "beautiful-react-hooks";
import { Button } from "reactstrap";
import styled from "styled-components";
import { PencilIcon, SaveIcon, TrashIcon } from "../../icons";

const CellWrapper = styled.div`
  //will match form input
  min-height: calc(1.5em + 0.75rem + 2px);
`;

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id, isEditable, editableCell },
  updateMyData,
}) => {
  const ref = useRef();
  const [, { onMouseEnter, onMouseLeave }] = useMouse(ref);
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  onMouseEnter(() => setIsHovered(true));
  onMouseLeave(() => setIsHovered(false));

  const onChange = useCallback((value) => {
    setValue(value);
  }, []);

  // We'll only update the external data when the input is blurred
  const onSave = useCallback(() => {
    setIsEditMode(false);
    updateMyData(index, id, value);
  }, [index, id, value]);

  const onCancel = useCallback(() => {
    setValue(initialValue);
    setIsEditMode(false);
  }, [initialValue]);

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (!isEditable) {
    return initialValue;
  }

  return (
    <CellWrapper ref={ref} className="d-flex flex-row gap-1 align-items-center">
      <div className="flex-grow-1">
        {isEditMode
          ? editableCell({ value: value || "", onChange })
          : initialValue}
      </div>
      {(isHovered || isEditMode) && (
        <div className="d-flex flex-row gap-1">
          {!isEditMode && (
            <Button size="sm" onClick={() => setIsEditMode(true)}>
              <PencilIcon />
            </Button>
          )}
          {isEditMode && (
            <>
              <Button size="sm" onClick={onSave} title="Save" color="success">
                <SaveIcon />
              </Button>
              <Button
                size="sm"
                onClick={onCancel}
                title="Cancel"
                color="danger"
              >
                <TrashIcon />
              </Button>
            </>
          )}
        </div>
      )}
    </CellWrapper>
  );
};

export default EditableCell;
