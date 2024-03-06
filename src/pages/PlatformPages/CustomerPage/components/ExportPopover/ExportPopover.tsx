import { useEffect, useState } from "react";
import { Button, Down, Export } from "src/components";
import { Popover } from "src/components/Dialogs";
import { AlphanumericKey } from "src/components/Icons/iconsDS";
import { SelectInputSmall } from "src/components/Inputs";
import Tooltip from "src/components/Misc/Tooltip";
import { useTypedDispatch } from "src/store/store";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
export default function ExportPopOver({ exportAction }) {
  const dispatch = useTypedDispatch();
  const fileTypes = [
    { name: "CSV", value: ".csv" },
    { name: "JSON", value: ".json" },
  ];
  const [file, setFile] = useState(fileTypes[0].value);
  const { enableScope, disableScope } = useHotkeysContext();
  const [showDropdown, setShowDropdown] = useState(false);
  useHotkeys(
    "e",
    () => {
      setShowDropdown((prev) => !prev);
    },
    {
      scopes: "exportLogs",
    }
  );
  useEffect(() => {
    enableScope("exportLogs");
    return () => {
      disableScope("exportLogs");
    };
  }, []);
  return (
    <Popover
      width="w-[320px]"
      padding=""
      align="end"
      sideOffset={4}
      open={showDropdown}
      setOpen={setShowDropdown}
      trigger={
        <div>
          <Tooltip
            side="bottom"
            sideOffset={8}
            align="center"
            delayDuration={1}
            content={
              <>
                <p className="caption text-gray-4">Export logs</p>
                <AlphanumericKey value={"E"} />
              </>
            }
          >
            <Button
              variant="small"
              icon={Export}
              text="Export"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
          </Tooltip>
        </div>
      }
    >
      <div className="flex-col gap-sm py-sm px-md">
        <div className="flex-col items-start gap-xxs self-stretch">
          <p className="text-md-medium text-gray-5">Export logs</p>
          <p className="text-sm-regular text-gray-4">
            Download the copy of your log data in CSV or JSON format.
          </p>
        </div>
        <div className="flex justify-between items-center self-stretch">
          <p className="text-sm-regular text-gray-4">File type</p>
          <SelectInputSmall
            headLess
            trigger={() => (
              <Button
                variant="small"
                text={fileTypes.filter((item) => item.value === file)[0].name}
                iconPosition="right"
                icon={Down}
              />
            )}
            align="end"
            defaultValue={fileTypes[0].value}
            choices={fileTypes}
            onChange={(e) => setFile(e.target.value)}
          />
        </div>
        <div className="flex justify-end items-center gap-xs self-stretch">
          <Button
            variant="r4-primary"
            text={
              "Download " +
              fileTypes.filter((item) => item.value === file)[0].name
            }
            onClick={() => dispatch(exportAction(file))}
            width="w-full"
          />
        </div>
      </div>
    </Popover>
  );
}
