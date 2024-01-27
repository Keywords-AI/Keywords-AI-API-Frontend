import React, { useEffect, useState } from "react";
import { DropDownMenu } from "src/components";
import { Button, DotsButton } from "src/components/Buttons";
import { Add, Filter } from "src/components/Icons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { RootState } from "src/types";
import {
  setFilterOpen,
  setFirstFilter,
  setSecondFilter,
} from "src/store/actions";
import { set } from "react-hook-form";

export function FilterActions({ type }: { type: string }) {
  const [start, setStart] = useState<boolean | undefined>(false);
  const [secondStep, setSecondStep] = useState<boolean | undefined>(false);
  const [filterType, setFilterType] = useState<boolean>(false);
  const filters = useTypedSelector((state: RootState) => state.requestLogs.filters);
  const dispatch = useTypedDispatch();


  useEffect(() => {
    if (type === "filter") {
      setFilterType(true);
    } else {
      setFilterType(false);
    }
  }, [type]);

  const filterOpen = useTypedSelector(
    (state: RootState) => state.requestLogs.filterOpen
  );

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
    const randomId = Math.random().toString(36).substring(2, 15);
    setSecondStep(true);
    if (data == "Status") {
      dispatch(setFirstFilter("failed"));
      const filterData = {
        metric: "failed",
        negation: false,
        value: "",
        id:""
      };
    } else if (data == "Prompt") {
      dispatch(setFirstFilter("prompt"));
      const filterData = {
        metric: "prompt",
        negation: false,
        value: "",
        id:""
      };
    }
  };

  const handleSecondClick = (data: string) => {
    dispatch(setSecondFilter(data));
    dispatch(setFilterOpen(true));
  };

  const handleApply = () => {};

  return (
    <React.Fragment>
      {filterType && (
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
      )}
      {!filterType && (
        <DropDownMenu
          open={start}
          setOpen={setStart}
          trigger={
            <DotsButton
              icon={Add}
            />
          }
          align="start"
          items={secondStep ? <ItemsSecond /> : <Items />}
        />
      )}
    </React.Fragment>
  );
}
