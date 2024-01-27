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
  setCurrentFilter,
  setFilters,
} from "src/store/actions";
import { set } from "react-hook-form";

export function FilterActions({ type }: { type: string }) {
  const [start, setStart] = useState<boolean | undefined>(false);
  const [secondStep, setSecondStep] = useState<boolean | undefined>(false);
  const [filterType, setFilterType] = useState<boolean>(false);
  const filters = useTypedSelector(
    (state: RootState) => state.requestLogs.filters
  );
  const keys = useTypedSelector((state: RootState) => state.requestLogs.keys);
  const models = useTypedSelector(
    (state: RootState) => state.requestLogs.models
  );
  const firstFilter = useTypedSelector(
    (state: RootState) => state.requestLogs.firstFilter
  );
  const currentFilter = useTypedSelector(
    (state: RootState) => state.requestLogs.currentFilter
  );
  const dispatch = useTypedDispatch();
  // console.log("keys", keys);
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
          text="API Key"
          onClick={(e) => handleFirstClick("API Key")}
        />
        <Button
          variant="panel"
          text="Model"
          onClick={(e) => handleFirstClick("Model")}
        />
        {/* <Button
          variant="panel"
          text="Prompt"
          onClick={(e) => handleFirstClick("Prompt")}
        /> */}
      </>
    );
  };

  const ItemsSecond = () => {
    return (
      <>
        {firstFilter === "failed" && (
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
        )}

        {firstFilter === "apiKey" &&
          keys.map((key, index) => (
            <Button
              variant="panel"
              text={key}
              onClick={(e) => handleSecondClick(key)}
            />
          ))}
        {firstFilter === "model" &&
          models.map((model, index) => (
            <Button
              variant="panel"
              text={model}
              onClick={(e) => handleSecondClick(model)}
            />
          ))}
      </>
    );
  };

  const handleFirstClick = (data: string) => {
    setSecondStep(true);
    if (data == "Status") {
      dispatch(setFirstFilter("failed"));
      const filterData = {
        metric: "failed",
        negation: false,
        value: "",
        id: "",
      };
      dispatch(setCurrentFilter(filterData));
    } else if (data == "API Key") {
      dispatch(setFirstFilter("apiKey"));
      const filterData = {
        metric: "apiKey",
        negation: false,
        value: "",
        id: "",
      };
      dispatch(setCurrentFilter(filterData));
    } else if (data == "Model") {
      dispatch(setFirstFilter("model"));
      const filterData = {
        metric: "model",
        negation: false,
        value: "",
        id: "",
      };
      dispatch(setCurrentFilter(filterData));
    }
  };

  const handleSecondClick = (data: string) => {
    const randomId = Math.random().toString(36).substring(2, 15);
    dispatch(setSecondFilter(data));
    const filterData = {
      metric: currentFilter.metric,
      negation: false,
      value: data,
      id: randomId,
    };
    dispatch(setFilterOpen(true));
    dispatch(setFilters([...filters, filterData]));
    setSecondStep(false);
  };

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
      {/* {!filterType && (
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
      )} */}
    </React.Fragment>
  );
}
