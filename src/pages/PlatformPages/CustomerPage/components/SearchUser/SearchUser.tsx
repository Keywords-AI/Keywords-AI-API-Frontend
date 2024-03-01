import React, { useEffect, useRef, useState } from "react";
import { AlphanumericKey, Close, Search } from "src/components";
import { DotsButton, IconButton } from "src/components/Buttons";
import { TextInputSmall } from "src/components/Inputs";
import { useForm } from "react-hook-form";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
import Tooltip from "src/components/Misc/Tooltip";
export default function SearchUser({ handleSearch, handleReset }) {
  const { register } = useForm();
  const [searchText, setSearchText] = useState("");
  const { enableScope, disableScope } = useHotkeysContext();
  useHotkeys("s", () => {}, {
    scopes: "log_actions",
    preventDefault: true,
  });
  useEffect(() => {
    enableScope("small_search_prompt");
    return () => {
      disableScope("small_search_prompt");
    };
  }, []);
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchText);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useHotkeys(
    "/",
    () => {
      if (inputRef.current) {
        if (document.activeElement !== inputRef.current) {
          inputRef.current.focus();
        } else {
          inputRef.current.blur();
        }
      }
    },
    {
      scopes: "small_search_prompt",
      preventDefault: true,
    }
  );
  return (
    <TextInputSmall
      placeholder="Search ID..."
      icon={Search}
      {...register("prompt", {
        value: searchText,
        onChange: (e) => setSearchText(e.target.value),
      })}
      name="prompt"
      ref={inputRef}
      value={searchText}
      width="w-[192px]"
      onKeyDown={onKeyDown}
      rightIcon={<AlphanumericKey value="/" />}
      CloseButton
      handleClose={() => {
        setSearchText("");
        handleReset();
      }}
    />
  );
}
