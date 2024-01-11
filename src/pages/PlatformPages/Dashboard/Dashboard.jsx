import React, { useEffect, useState } from "react";
// import { ButtonGroup } from "src/components/Buttons";
import MetricCard from "src/components/Cards/MetricCard";
import { Quality, Rocket, Cost, Tokens, Speed } from "src/components/Icons";
import ButtonGroup from "src/components/Buttons/ButtonGroup";
import { setQueryParams } from "src/utilities/navigation";
import { TitleAuth, TitleStaticSubheading } from "src/components/Titles";
import { DashboardChart } from "src/components/Display";
import { connect } from "react-redux";
import { getDashboardData, setDateData, setPanelData } from "src/store/actions";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "src/components";
import { PanelGraph } from "src/components/Sections";

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
  costData,
  getDashboardData,
  firstTime,
  panelData,
  setPanelData,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const summary_type = new URLSearchParams(location.search).get("summary_type");
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
    setIsPanel(true);
  };

  const setSummaryType = (summary_type) => {
    // Wrapper, for cleaner code
    setQueryParams({ summary_type }, navigate);
  };
  const buttons = [
    { text: "Day", onClick: () => setSummaryType("daily") },
    { text: "Week", onClick: () => setSummaryType("weekly") },
    { text: "Month", onClick: () => setSummaryType("monthly") },
    { text: "Year", onClick: () => setSummaryType("yearly") },
  ];
  const metrics = [
    {
      icon: Rocket,
      title: "Request",
      number: summary.number_of_requests,
      chartData: requestCountData,
      dataKey: "number_of_requests",
      onClick: () => handleClick("Request"),
    },
    {
      icon: Speed,
      title: "Latency",
      number: `${summary.average_latency?.toFixed(3) || 0}`,
      chartData: latencyData,
      dataKey: "average_latency",
      unit: true,
      onClick: () => handleClick("Latency"),
    },
    {
      icon: Tokens,
      title: "Tokens",
      number: summary.total_tokens || 0,
      chartData: tokenCountData,
      dataKey: "total_tokens",
      onClick: () => handleClick("Tokens"),
    },
    {
      icon: Cost,
      title: "Cost",
      number: `$${summary.total_cost?.toFixed(3) || 0}`,
      chartData: costData,
      dataKey: "total_cost",
      onClick: () => handleClick("Cost"),
    },
  ];
  const MetricNumber = (panelData) =>
    metrics.find((metric) => metric.title === panelData)?.number || 0;
  if (firstTime !== undefined && firstTime) return <WelcomeState />;
  else
    return (
      <div className="flex flex-row w-full">
        <div className="flex flex-wrap flex-col w-full h-full p-lg gap-lg">
          <div className="flex flex-row justify-between w-full self-stretch">
            <div className="flex flex-col gap-xxxs">
              <span className="text-sm-regular text-gray-3">
                {organization?.name || "Organization"}
              </span>
              <span className="display-sm">Welcome, {firstName}</span>
            </div>
            <ButtonGroup buttons={buttons} />
          </div>
          <div className="grid grid-cols-4 gap-md">
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
          <DashboardChart />
          <TitleStaticSubheading title="Logs" subtitle="Coming soon!" />
        </div>
        {isPanel && (
          <PanelGraph metric={panelData} number={MetricNumber(panelData)} />
        )}
      </div>
    );
}

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardNotConnected);
