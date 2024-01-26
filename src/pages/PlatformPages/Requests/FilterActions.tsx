import React, { useState } from "react";
import { DropDownMenu } from "src/components";
import { Button } from "src/components/Buttons";
import { Filter } from "src/components/Icons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { RootState } from "src/types";
import { setFilterOpen, setFilter, setSecondFilter } from "src/store/actions";

export function FilterActions() {
  const [start, setStart] = useState<boolean | undefined>(false);
  const [secondStep, setSecondStep] = useState<boolean | undefined>(false);
  const filterOpen = useTypedSelector(
    (state: RootState) => state.requestLogs.filterOpen
  );
  const dispatch = useTypedDispatch();
  const Items = () => {
    return (
      <>
        <Button
          variant="panel"
          text="Status"
            onClick={() => handleFirstClick("Status")}
        />
        <Button
          variant="panel"
          text="Prompt"
          onClick={(e) => handleFirstClick("Prompt")}
        />
        {/* <Button
            variant="panel"
            text="Filter by type"
            onClick={() => setSecondStep(true)}
          /> */}
      </>
    );
  };

  const ItemsSecond = () => {
    return (
      <>
        <Button
          variant="panel"
          text="success"
          onClick={(e) => handleSecondClick("false")}
        />
        <Button
          variant="panel"
          text="error"
          onClick={(e) => handleSecondClick("true")}
        />
      </>
    );
  };

  const handleFirstClick = (data: string) => {
    setSecondStep(true);
    if (data == "Status") {
      dispatch(setFilter("failed"));
    } else if (data == "Prompt") {
      dispatch(setFilter("prompt"));
    }
  };

  const handleSecondClick = (data: string) => {
    console.log("bugbug",data);
    dispatch(setSecondFilter(data));
    dispatch(setFilterOpen(true));
  };

  return (
    <DropDownMenu
      open={start}
      setOpen={setStart}
      trigger={
        <Button
          variant="small"
          icon={Filter}
          text="Filter"
          // borderColor="shadow-border-dashed"
        />
      }
      align="start"
      items={secondStep ? <ItemsSecond /> : <Items />}
    />
  );
}
