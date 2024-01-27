import React, { useEffect, useState } from "react";
import { DropDownMenu } from "src/components";
import { Button, DotsButton } from "src/components/Buttons";
import { Add, Filter } from "src/components/Icons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { RootState } from "src/types";
import {
  getRequestLogs,
  addFilter
} from "src/store/actions";

export function FilterActions({ type }: { type: string }) {
  const [start, setStart] = useState<boolean | undefined>(false);
  const [secondStep, setSecondStep] = useState<boolean | undefined>(false);
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const keys = useTypedSelector((state: RootState) => state.requestLogs.keys);
  const models = useTypedSelector(
    (state: RootState) => state.requestLogs.models
  );
  const dispatch = useTypedDispatch();

  const Items = () => {
    return (
      <>
        {/* {Object.keys(filterOptions).map((key, index) => {
          <Button
            key={index}
            variant="panel"
            text={filterOptions[key].display_name}
            onClick={() => handleFirstClick("Status")}
          />;
        })} */}
        <Button
          variant="panel"
          text={"Status"}
          onClick={() => handleFirstClick("failed")}
        />
        <Button
          variant="panel"
          text={"API Key"}
          onClick={() => handleFirstClick("apiKey")}
        />
      </>
    );
  };

  const ItemsSecond = () => {
    return (
      <>
        {filterType === "failed" && (
          <>
            <Button
              variant="panel"
              text="success"
              onClick={(e) => handleSecondClick(false)}
            />
            <Button
              variant="panel"
              text="error"
              onClick={(e) => handleSecondClick(true)}
            />
          </>
        )}

        {filterType === "apiKey" &&
          keys.map((key, index) => (
            <Button
              variant="panel"
              text={key}
              onClick={(e) => handleSecondClick(key)}
            />
          ))}
        {filterType === "model" &&
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
    setFilterType(data);
  };
  const handleSecondClick = (data: any) => {
    dispatch(addFilter({
      metric: filterType,
      negation: false,
      value: data,
      id: Math.random().toString(36).substring(2, 15),
    }));
    setStart(false);
    dispatch(getRequestLogs({
      [filterType as string]: {
        operator: filterType === "failed" ? "not" : "=",
        value: data,
      }
    }));
  };

  return (
    <React.Fragment>
      {type && (
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
