import React, { useState } from "react";
import { DropDownMenu } from "src/components";
import { Button } from "src/components/Buttons";
import { Filter } from "src/components/Icons";

export function FilterActions() {
  const [start, setStart] = useState(false);
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
      items={
        <>
          <Button
            variant="small"
            text="Filter by date"
            onClick={() => console.log("Filter by date")}
          />
          <Button
            variant="small"
            text="Filter by status"
            onClick={() => console.log("Filter by status")}
          />
          <Button
            variant="small"
            text="Filter by type"
            onClick={() => console.log("Filter by type")}
          />
        </>
      }
    />
  );
}
