import React, { useEffect } from "react";
// import { ButtonGroup } from "src/components/Buttons";
import MetricCard from "src/components/Cards/MetricCard";
import { Quality, Rocket, Cost, Tokens, Speed } from "src/components/Icons";
import ButtonGroup from "src/components/Buttons/ButtonGroup";
import { setQueryParams } from "src/utilities/navigation";
import { TitleStaticSubheading } from "src/components/Titles";
import { DashboardChart } from "src/components/Display";
import { connect } from "react-redux";
import { getDashboardData, setDateData } from "src/store/actions";
import { useNavigate, useLocation } from "react-router-dom";

const mapStateToProps = (state) => ({
  summary: state.dashboard.summary,
  requestCountData: state.dashboard.requestCountData,
  latencyData: state.dashboard.latencyData,
  tokenCountData: state.dashboard.tokenCountData,
  costData: state.dashboard.costData,
});
const mapDispatchToProps = {
  getDashboardData,
  setDateData,
};

function DashboardNotConnected({
  summary,
  requestCountData,
  latencyData,
  tokenCountData,
  costData,
  getDashboardData,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const summary_type = new URLSearchParams(location.search).get("summary_type");
  useEffect(() => {
    getDashboardData();
    setDateData(summary_type);
  }, [summary_type]);

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
      title: "Average latency / request",
      number: `${summary.average_latency?.toFixed(3) || 0}s`,
      chartData: latencyData,
      dataKey: "average_latency",
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
      number: `$${summary.total_cost?.toFixed(5) || 0}`,
      chartData: costData,
      dataKey: "total_cost",
    },
  ];

  return (
    <div className="flex flex-wrap flex-col w-full h-full p-lg gap-lg">
      <div className="flex flex-row justify-between w-full self-stretch">
        <span className="display-sm">Welcome, first_name</span>
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
