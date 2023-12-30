import React from "react";
// import { ButtonGroup } from "src/components/Buttons";
import MetricCard from "src/components/Cards/MetricCard";
import { Quality, Rocket, Cost, Tokens, Speed } from "src/components/Icons";
import ButtonGroup from "src/components/Buttons/ButtonGroup";
import { TitleStaticSubheading } from "src/components/Titles";
import DashboardChart from "src/components/Display/DashboardChart";
import { setQueryParams } from "src/utilities/navigation";


export function Dashboard() {

  const buttons = [
    { text: "Day", onClick: () => setQueryParams({summary_type:"daily"}) },
    { text: "Week", onClick: () => setQueryParams({summary_type:"weekly"}) },
    { text: "Month", onClick: () => setQueryParams({summary_type:"mothly"}) },
    { text: "Year", onClick: () => setQueryParams({summary_type:"yearly"}) },
  ];
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
