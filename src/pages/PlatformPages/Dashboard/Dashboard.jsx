import React, { useEffect, useState } from "react";
// import { ButtonGroup } from "src/components/Buttons";
import MetricCard from "src/components/Cards/MetricCard";
import {
  Quality,
  Rocket,
  Cost,
  Tokens,
  Speed,
  Display,
  Down,
  sideBar,
} from "src/components/Icons";
import ButtonGroup from "src/components/Buttons/ButtonGroup";
import { setQueryParams } from "src/utilities/navigation";
import { TitleAuth, TitleStaticSubheading } from "src/components/Titles";
import { DashboardChart } from "src/components/Display";
import { connect } from "react-redux";
import { getDashboardData, setDateData, setPanelData } from "src/store/actions";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "src/components";
import { PanelGraph } from "src/components/Sections";
import { SelectInput } from "src/components/Inputs";
import { DotsButton } from "src/components/Buttons";

const mapStateToProps = (state) => ({
  summary: state.dashboard.summary,
  organization: state.organization,
  firstName: state.user.first_name,
  requestCountData: state.dashboard.requestCountData,
  latencyData: state.dashboard.latencyData,
  tokenCountData: state.dashboard.tokenCountData,
  costData: state.dashboard.costData,
  firstTime: !state.organization?.has_api_call,
  panelData: state.dashboard.panelData,
  promptTokenCountData: state.dashboard.promptTokenCountData,
  completionTokenCountData: state.dashboard.completionTokenCountData,
});
const mapDispatchToProps = {
  getDashboardData,
  setDateData,
  setPanelData,
};

const WelcomeState = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-col flex-1 self-stretch p-lg gap-lg items-start bg-gray-1 ">
      <div className="flex-col justify-center items-center gap-md flex-1 self-stretch rounded-md shadow-window outline outline-1 outline-gray-3">
        <TitleAuth
          title="Welcome to Keywords AI!"
          subtitle={"Send your first API call to view your dashboard."}
          align="items-center"
        />
        <div className="flex justify-center items-center gap-xs">
          <Button
            variant="r4-primary"
            text="Get API keys"
            onClick={() => navigate("/platform/api")}
          />
          <Button
            variant="r4-black"
            text="View docs"
            onClick={() => window.open("https://docs.keywordsai.co", "_blank")}
          />
        </div>
      </div>
    </div>
  );
};

function DashboardNotConnected({
  summary,
  organization,
  firstName,
  requestCountData,
  latencyData,
  tokenCountData,
  promptTokenCountData,
  completionTokenCountData,
  costData,
  getDashboardData,
  firstTime,
  panelData,
  setPanelData,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const summary_type = new URLSearchParams(location.search).get("summary_type") || "monthly";
  const [isPanel, setIsPanel] = useState(false);
  useEffect(() => {
    getDashboardData();
    setDateData(summary_type);
  }, [summary_type]);
  useEffect(() => {
    getDashboardData();
  }, []);

  const handleClick = (data) => {
    setPanelData(data);
    setIsPanel(prevIsPanel => !prevIsPanel);
  };

  const handleTimePeriodSelection = (selectedValue) => {
    setSummaryType(selectedValue);
  };
  const setSummaryType = (summary_type) => {
    // Wrapper, for cleaner code
    setQueryParams({ summary_type }, navigate);
  };
  // const buttons = [
  //   { text: "Day", onClick: () => setSummaryType("daily") },
  //   { text: "Week", onClick: () => setSummaryType("weekly") },
  //   { text: "Month", onClick: () => setSummaryType("monthly") },
  //   { text: "Year", onClick: () => setSummaryType("yearly") },
  // ];
  const metrics = [
    {
      title: "Request",
      number: summary.number_of_requests,
      chartData: requestCountData,
      dataKey: "number_of_requests",
      // onClick: () => handleClick("Request"),
    },
    {
      title: "Latency",
      number: `${summary.average_latency?.toFixed(3) || 0}`,
      chartData: latencyData,
      dataKey: "average_latency",
      unit: true,
      // onClick: () => handleClick("Latency"),
    },
    {
      title: "Prompt Tokens",
      number: summary.total_prompt_tokens || 0,
      chartData: promptTokenCountData,
      dataKey: "total_prompt_tokens",
      // onClick: () => handleClick("Tokens"),
    },
    {
      title: "Output Tokens",
      number: summary.total_completion_tokens || 0,
      chartData: completionTokenCountData,
      dataKey: "total_completion_tokens",
      // onClick: () => handleClick("Tokens"),
    },
    {
      title: "Cost",
      number: `$${summary.total_cost?.toFixed(3) || 0}`,
      chartData: costData,
      dataKey: "total_cost",
      // onClick: () => handleClick("Cost"),
    },
  ];
  const MetricNumber = (panelData) =>
    metrics.find((metric) => metric.title === panelData)?.number || 0;
  if (firstTime !== undefined && firstTime) return <WelcomeState />;
  else
    return (
      <div className="flex flex-col w-full h-full">
        {/* <span className="text-sm-regular text-gray-3">
                {organization?.name || "Organization"}
              </span> */}

        {/* <ButtonGroup buttons={buttons} /> */}
        <div className="grid grid-cols-6 px-lg items-start self-stretch">
          <div className="flex flex-col py-md items-start gap-xxs self-stretch">
            <span className="text-sm-md text-gray-4">Welcome</span>
            <span className="display-sm text-gray-5">{firstName} </span>
          </div>
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
        <div className="flex flex-row py-xs px-lg justify-between items-center self-stretch shadow-border shadow-gray-2 w-full">
          <div className="flex items-center content-center gap-xs flex-wrap">
            {" "}
          </div>
          <div className="flex items-center gap-xxs">
            <Button variant="small" text="Today" />
            <SelectInput
              headLess
              placeholder="Month"
              align="start"
              icon={Down}
              padding="py-xxxs px-xs"
              gap="gap-xxs"
              choices={[
                { name: "Day", value: "daily" },
                { name: "Week", value: "weekly" },
                { name: "Month", value: "monthly" },
                { name: "Year", value: "yearly" },
              ]}
              handleSelected={handleTimePeriodSelection}
            />
            <Button
              variant="small"
              text="Display"
              icon={Display}
              secIcon={Down}
              secIconPosition="right"
            />
            <div className="w-[1px] h-[28px] shadow-border shadow-gray-2 "></div>
            <DotsButton icon={sideBar} bgColor="bg-gray-2" onClick={() => handleClick("Request")}/>
          </div>
        </div>
        <div className="flex flex-row">
        <DashboardChart />
        {isPanel && <PanelGraph metric={panelData} number={MetricNumber(panelData)} />}
        </div>
      </div>
    );
}

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardNotConnected);
