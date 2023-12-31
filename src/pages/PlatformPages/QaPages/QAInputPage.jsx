import react from "react";
import { Button } from "src/components";
import { Search } from "src/components/Icons/iconsDS";
import {
  CheckboxInput,
  RadioInput,
  SelectInput,
  TextInput,
} from "src/components/Inputs";
import { NavBar, PageContent, PageParagraph } from "src/components/Sections";
import { useForm } from "react-hook-form";
import { CheckBoxButton } from "src/components/Buttons";
import ModelPresetCard from "src/components/Cards/ModelPresetCard";

export const QAInputPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <PageContent title="Input Field Wall">
      <PageParagraph heading="Text Input"></PageParagraph>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageParagraph heading="">
          <TextInput titte="Text Input" icon={<Search size="md" />} />
          <SelectInput title="Select title" width="w-[400px]"
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
          <CheckBoxButton text="test" />

        </PageParagraph>
      </form>
      <PageParagraph heading="Select Input">
        <ModelPresetCard />
      </PageParagraph>
    </PageContent>
  );
};
