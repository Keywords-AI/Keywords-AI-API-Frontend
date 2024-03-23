import react, { PureComponent } from "react";
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
import { Paginator } from "src/pages/PlatformPages/Requests/Paginator";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import Accordion from "src/components/Sections/Accordion/Accordion";
import { BCrumb } from "src/components/Sections/BreadCrumb/BreadCrumb";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

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
      <Paginator />
      <Accordion />
      <Accordion />
      <BCrumb
        items={[
          { label: "Home", onC: "/" },
          { label: "Home", action: "/" },
        ]}
      />
    </PageContent>
  );
};
