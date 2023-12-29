import react from "react";
import { Button } from "src/components";
import { Search } from "src/components/Icons/iconsDS";
import { RadioInput, SelectInput, TextInput } from "src/components/Inputs";
import { NavBar, PageContent, PageParagraph } from "src/components/Sections";

export const QAInputPage = () => {
  return (
    <PageContent title="Input Field Wall">
      <PageParagraph heading="Text Input"></PageParagraph>

      <PageParagraph heading="">
        <TextInput titte="Text Input" icon={<Search size="md" />} />
        <SelectInput title="Select title" width="w-[400px]"/>
        <RadioInput text="This is a radio input"/>
      </PageParagraph>
    </PageContent>
  );
};