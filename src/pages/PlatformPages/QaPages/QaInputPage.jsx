import react, { useState } from "react";
import { Button } from "src/components";
import { Filter, Search } from "src/components/Icons/iconsDS";
import {
  CheckboxInput,
  RadioInput,
  SelectInput,
  TextInput,
  SelectInputTest,
  SelectInputMenu,
  SelectCheckBoxMenu,
} from "src/components/Inputs";
import { NavBar, PageContent, PageParagraph } from "src/components/Sections";
import { useForm } from "react-hook-form";
import { CheckBoxButton } from "src/components/Buttons";
import ModelPresetCard from "src/components/Cards/ModelPresetCard";
import React from "react";
import EditBox from "src/components/Inputs/EditBox";

export const QaInputPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const [start, setStart] = useState(false);
  const handleDropdownOpen = (open) => {
    console.log("opening dropdown", open);
    setStart(open);
  };
  const defaultOptions = [
    { name: "AA", value: "aa" },
    { name: "BB", value: "bb" },
  ];
  return (
    <PageContent title="Input Field Wall">
      <PageParagraph heading="Components"></PageParagraph>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageParagraph heading="">
          <TextInput title="Text Input" icon={<Search size="md" />} />
          <SelectInput
            title="Select title"
            width="w-[400px]"
            {...register("selection")}
          />
          {/* {Array.from({ length: 5 }).map((_, i) => (
            <RadioInput
              key={i}
              text={`Radio ${i}`}
              name="radio"
              {...register("radio")}
            />
          ))} */}
          <RadioInput
            text={`Radio Prime A`}
            {...register("radio")}
            value="choice A"
          />
          <RadioInput
            text={`Radio Prime B`}
            {...register("radio")}
            value="choice B"
          />
          <RadioInput
            text={`Radio Prime C`}
            {...register("radio")}
            value="choice C"
          />
          <input type="radio" {...register("vanilla")} />
          {/* <input type="radio" {...register("vanilla")} value="choice B"/>
            <input type="radio" {...register("vanilla")} value="choice C"/> */}
          <Button variant="r4-white" text="Submit to see" />
          <CheckboxInput
            text="Enable for new chats"
            {...register("checkbox")}
            value="choice A"
          />
          <CheckboxInput
            text="Enable for new chats"
            {...register("checkbox")}
            value="choice B"
          />
          <SelectInputTest {...register("select_test")} />
          <CheckBoxButton text="test" />
          <ModelPresetCard />
          <SelectInputMenu
            trigger={
              <Button
                variant="small"
                icon={Filter}
                text="Filter"
                className="outline-none"
              />
            }
            open={start}
            setOpen={handleDropdownOpen}
            align="start"
            items={[
              { name: "AA", value: "aa" },
              { name: "cat", value: "cc" },
              { name: "BB", value: "bb" },
            ]}
            // multiple={true}
          />
          <SelectCheckBoxMenu
            trigger={
              <Button
                variant="small"
                icon={Filter}
                text="Filter"
                className="outline-none"
              />
            }
            open={start}
            setOpen={handleDropdownOpen}
            align="start"
            items={[
              { name: "AA", value: "aa" },
              { name: "cat", value: "cc" },
              { name: "BB", value: "bb" },
            ]}
          />
        </PageParagraph>
        <div className="w-[400px] h-[200px] border border-gray-5">
          <EditBox {...register("edtibaleBox")} value="init value" />
        </div>
      </form>
    </PageContent>
  );
};
