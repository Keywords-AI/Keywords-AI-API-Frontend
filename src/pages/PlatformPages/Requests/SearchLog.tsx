import React, { useEffect, useState } from "react";
import { AlphanumericKey, Close, Search } from "src/components";
import { DotsButton, IconButton } from "src/components/Buttons";
import { TextInputSmall } from "src/components/Inputs";
import { useForm } from "react-hook-form";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
import Tooltip from "src/components/Misc/Tooltip";
export default function SearchLog({ handleSearch, handleReset }) {
  const { register } = useForm();
  const [collapse, setCollapse] = useState(true);
  const [searchText, setSearchText] = useState("");
  const { enableScope, disableScope } = useHotkeysContext();
  useHotkeys(
    "s",
    () => {
      setCollapse((prev) => !prev);
    },
    {
      scopes: "log_actions",
      preventDefault: true,
    }
  );
  useEffect(() => {
    enableScope("log_actions");
    return () => {
      disableScope("log_actions");
    };
  }, []);
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchText);
    }
  };

  return collapse ? (
    <div>
      <Tooltip
        side="bottom"
        sideOffset={8}
        align="center"
        content={
          <>
            <p className="caption text-gray-4">Search for text</p>
            <AlphanumericKey value={"S"} />
          </>
        }
      >
        <div>
          <DotsButton
            icon={Search}
            onClick={() => setCollapse(false)}
            className="w-[28px] h-[28px]"
          />
        </div>
      </Tooltip>
    </div>
  ) : (
    <TextInputSmall
      placeholder="Search prompt..."
      icon={Search}
      {...register("prompt", {
        value: searchText,
        onChange: (e) => setSearchText(e.target.value),
      })}
      name="prompt"
      value={searchText}
      width="w-[192px]"
      onKeyDown={onKeyDown}
      CloseButton
      handleClose={() => {
        setSearchText("");
        setCollapse(true);
        handleReset();
      }}
    />
  );
}
