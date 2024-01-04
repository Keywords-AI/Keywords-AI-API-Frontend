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
import { CodeViewer } from "src/components/CodeViewer";

export const QaMiscPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <PageContent title="Misc Wall">
      <PageParagraph heading="Code Viewer">
        <CodeViewer />
      </PageParagraph>
    </PageContent>
  );
};
