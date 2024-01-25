import React, { useState } from "react";
import { DropDownMenu } from "src/components";
import { Button } from "src/components/Buttons";
import { Filter } from "src/components/Icons";


export function FilterActions() {
    const [start, setStart] = useState<boolean | undefined>(false);
    const [secondStep, setSecondStep] = useState<boolean | undefined>(false);

    const Items = () => {
      return (
        <>
          <Button
            variant="panel"
            text="Status"
            onClick={() => setSecondStep(true)}
          />
          <Button
            variant="panel"
            text="Prompt"
            onClick={() => setSecondStep(true)}
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
            onClick={() => setSecondStep(true)}
          />
        </>
      );
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

