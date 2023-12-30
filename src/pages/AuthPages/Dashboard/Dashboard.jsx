import React from "react";
// import { ButtonGroup } from "src/components/Buttons";
import MetricCard from "src/components/Cards/MetricCard";
import { PageContent } from "src/components/Sections";
import { Quality, Rocket, Cost, Tokens, Speed } from "src/components/Icons";

import { Button } from "src/components";
import ButtonGroup from "src/components/Buttons/ButtonGroup";
import { UsageChart } from "src/components/Display";
import { TitleStaticSubheading } from "src/components/Titles";
import DashboardChart from "src/components/Display/DashboardChart";

const buttons = [
  { text: "Day", onClick: () => console.log("Clicked Day") },
  { text: "Week", onClick: () => console.log("Clicked Week") },
  { text: "Month", onClick: () => console.log("Clicked Month") },
  { text: "Quarter", onClick: () => console.log("Clicked Quarter") },
];

export function Dashboard() {
  return (
    <div className="flex flex-wrap flex-col w-full h-full p-lg gap-lg">
      <div className="flex flex-row justify-between w-full self-stretch">
        <span className="display-sm">Dashboard</span>
        <ButtonGroup buttons={buttons} />
      </div>
      <div className="grid grid-cols-4 gap-md">
        <MetricCard icon={Cost} title="Cost" number="$0.29" />
        <MetricCard
          icon={Rocket}
          title="Request"
          number="82"
          percentage="130"
        />
        <MetricCard
          icon={Tokens}
          title="Tokens"
          number="134057"
          percentage="29"
          fill="fill-error"
          text="text-error"
        />
        <MetricCard
          icon={Speed}
          title="Average latency / request"
          number="9.9ms"
          percentage="12"
          up={false}
        />
      </div>
      <DashboardChart />
      <TitleStaticSubheading title="Log" subtitle="Coming soon!" />
    </div>
  );
}
