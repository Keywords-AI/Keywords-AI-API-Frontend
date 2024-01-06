import React, { useEffect } from "react";
// import { ButtonGroup } from "src/components/Buttons";
import MetricCard from "src/components/Cards/MetricCard";
import { Quality, Rocket, Cost, Tokens, Speed } from "src/components/Icons";
import ButtonGroup from "src/components/Buttons/ButtonGroup";
import { setQueryParams } from "src/utilities/navigation";
import { TitleAuth, TitleStaticSubheading } from "src/components/Titles";
import { DashboardChart } from "src/components/Display";
import { connect } from "react-redux";
import { getDashboardData, setDateData } from "src/store/actions";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "src/components";

const mapStateToProps = (state) => ({
  summary: state.dashboard.summary,
  organization: state.organization,
  firstName: state.user.first_name,
  requestCountData: state.dashboard.requestCountData,
  latencyData: state.dashboard.latencyData,
  tokenCountData: state.dashboard.tokenCountData,
  costData: state.dashboard.costData,
  notfirstTime: state.user.has_api_call,
});
const mapDispatchToProps = {
  getDashboardData,
  setDateData,
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
            onClick={() =>
              (window.location.href = "https://docs.keywordsai.co")
            }
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
  notfirstTime,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const summary_type = new URLSearchParams(location.search).get("summary_type");
  useEffect(() => {
    getDashboardData();
    setDateData(summary_type);
  }, [summary_type]);
  useEffect(()=>{
    getDashboardData();
  }, [])

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
    },
    {
      icon: Speed,
      title: "Average latency",
      number: `${summary.average_latency?.toFixed(3) || 0}` ,
      chartData: latencyData,
      dataKey: "average_latency",
      unit: true,
    },
    {
      icon: Tokens,
      title: "Tokens",
      number: summary.total_tokens || 0,
      chartData: tokenCountData,
      dataKey: "total_tokens",
    },
    {
      icon: Cost,
      title: "Cost",
      number: `$${summary.total_cost?.toFixed(3) || 0}`,
      chartData: costData,
      dataKey: "total_cost",
    },
  ];
  if (notfirstTime !== undefined && !notfirstTime) return <WelcomeState />;
  else
    return (
      <div className="flex flex-wrap flex-col w-full h-full p-lg gap-lg">
        <div className="flex flex-row justify-between w-full self-stretch">
          <div className="flex flex-col gap-xxxs">
            <span className="text-sm-regular text-gray-3">{organization?.name || "Organization"}</span>
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
        <TitleStaticSubheading title="Log" subtitle="Coming soon!" />
      </div>
    );
}

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardNotConnected);
