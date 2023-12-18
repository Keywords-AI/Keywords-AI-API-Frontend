import React from "react";
import { ButtonGroup } from "src/components/Buttons";
import MetricCard from "src/components/Cards/MetricCard";
import { PageContent } from "src/components/Sections";
import { Cost } from "../Playground/components/ModelOutput/icons";
import { Quality, Rocket } from "src/components";
import { Speed } from "../Playground/components/OptionSelector/icons";

const buttons = [
  { text: "Day", onClick: () => console.log("Clicked Day") },
  { text: "Week", onClick: () => console.log("Clicked Week") },
  { text: "Month", onClick: () => console.log("Clicked Month") },
  { text: "Quarter", onClick: () => console.log("Clicked Quarter") },
];

export default function Dashboard() {
  return (
    <div className="flex flex-wrap flex-col w-full h-full p-lg gap-lg">
      <div className="flex flex-row justify-between w-full">
        <span className="display-sm">Dashboard</span>
        <ButtonGroup buttons={buttons}></ButtonGroup>
      </div>
      <div className="flex flex-row gap-md h-fit">
        <MetricCard 
            icon={Cost} 
            title="Total cost" 
            number="$0.29"/>
        <MetricCard 
            icon={Rocket} 
            title="Total request" 
            number="82" 
            percentage="130"/>
        <MetricCard
          icon={Quality}
          title="Average cost / request"
          number="$0.0002"
          percentage="29"
        />
        <MetricCard
          icon={Speed}
          title="Average cost / request"
          number="9.9ms"
          percentage="12"
        />
      </div>
    </div>
  );
}
