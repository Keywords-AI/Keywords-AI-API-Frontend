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
import { useNavigate, useLocation, Form } from "react-router-dom";
import { Button } from "src/components";
import { PanelGraph } from "src/components/Sections";
import { SelectInput } from "src/components/Inputs";
import { DotsButton } from "src/components/Buttons";
import { useForm } from "react-hook-form";
import { Popover } from "src/components/Dialogs";
import { Metrics } from "src/utilities/constants";

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
  const { register, handleSubmit, watch } = useForm();
  const [showPopover, setShowPopover] = useState(false);
  const [isPanel, setIsPanel] = useState(false);
  const summary_type =
    new URLSearchParams(location.search).get("summary_type") || "monthly";
  const performance_param =
    new URLSearchParams(location.search).get("performance_param") ||
    "request_count";
  const calculation_type =
    new URLSearchParams(location.search).get("calculation_type") || "total";
  const breakdown_type =
    new URLSearchParams(location.search).get("breakdown_type") || "none";

  useEffect(() => {
    getDashboardData();
    setDateData(summary_type);
  }, [summary_type]);
  useEffect(() => {
    getDashboardData();
  }, []);

  const handleClick = (data) => {
    setIsPanel((prevIsPanel) => !prevIsPanel);
  };
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPopover(false);
  };
  const handleTimePeriodSelection = (selectedValue) => {
    setSummaryType(selectedValue);
  };

  const onSubmit = (data) => {
    console.log("data", data);
    setPerformanceParam(data.metric);
    setPanelData(data.metric);
    setCalculationType(data.type);
    setBreakdownType(data.breakdown);
    setShowPopover(false);
  };

  const setSummaryType = (summary_type) => {
    // Wrapper, for cleaner code
    setQueryParams({ summary_type }, navigate);
  };
  const setPerformanceParam = (performance_param) => {
    setQueryParams({ performance_param }, navigate);
  };
  const setCalculationType = (calculation_type) => {
    setQueryParams({ calculation_type }, navigate);
  };
  const setBreakdownType = (breakdown_type) => {
    console.log("breakdown_type", breakdown_type);
    setQueryParams({ breakdown_type }, navigate);
  };

  const metrics = [
    {
      title: Metrics.number_of_requests.name,
      number: summary.number_of_requests,
      chartData: requestCountData,
      dataKey: Metrics.number_of_requests.value,
      // onClick: () => handleClick("Request"),
    },
    {
      title: Metrics.average_latency.name,
      number: `${summary.average_latency?.toFixed(3) || 0}`,
      chartData: latencyData,
      dataKey: Metrics.average_latency.value,
      unit: true,
      // onClick: () => handleClick("Latency"),
    },
    {
      title: Metrics.total_prompt_tokens.name,
      number: summary.total_prompt_tokens || 0,
      chartData: promptTokenCountData,
      dataKey: Metrics.total_prompt_tokens.value,
      // onClick: () => handleClick("Tokens"),
    },
    {
      title: Metrics.output_token_count.name,
      number: summary.total_completion_tokens || 0,
      chartData: completionTokenCountData,
      dataKey: Metrics.output_token_count.value,
      // onClick: () => handleClick("Tokens"),
    },
    {
      title: Metrics.total_cost.name,
      number: `$${summary.total_cost?.toFixed(3) || 0}`,
      chartData: costData,
      dataKey: Metrics.total_cost.value,
      // onClick: () => handleClick("Cost"),
    },
  ];

  const [metric, setMetric] = useState("request_count");
  const [type, setType] = useState("total");
  const [breakdown, setBreakdown] = useState("none");

  const typeChoices = [
    { name: "Total", value: "total" },
    { name: "Average", value: "avg" },
  ];

  const breakdownChoices = [
    { name: "None", value: "none" },
    { name: "By model", value: "by_model" },
    { name: "By key", value: "by_key" },
    { name: "By token type", value: "by_token_type" }, //only for total tokens
  ];

  useEffect(() => {
    if (
      (metric === "output_token_count" || metric === "prompt_token_count") &&
      breakdown === "by_token_type"
    ) {
      console.log("here");
      setBreakdown("none"); // Default to 'request_count' or any other metric
    }
  }, [metric, breakdown]);

  const filteredBreakdownChoices =
    metric === "output_token_count" || metric === "prompt_token_count"
      ? breakdownChoices.filter((choice) => choice.value !== "by_token_type")
      : breakdownChoices;

  const MetricNumber = (panelData) =>
    metrics.find((metric) => metric.dataKey === panelData)?.number || 0;
  if (firstTime !== undefined && firstTime) return <WelcomeState />;
  else
    return (
      <div className="flex flex-col w-full h-full">
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
            <Popover
              trigger={
                <Button
                  variant="small"
                  text="Display"
                  icon={Display}
                  secIcon={Down}
                  secIconPosition="right"
                  onClick={() => setShowPopover((prev) => !prev)}
                />
              }
              open={showPopover}
              setOpen={setShowPopover}
              side="bottom"
              sideOffset={5}
              align="end"
              alignOffset={-45}
              width="min-w-[240px] w-[320px]"
            >
              <form
                className={"flex flex-col gap-xs items-end"}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col items-start gap-xxs self-stretch">
                  <div className="flex justify-between items-center self-stretch ">
                    <span className="text-sm-regular text-gray-4">Metric</span>
                    <SelectInput
                      {...register("metric")}
                      headLess
                      placeholder="Request"
                      align="start"
                      icon={Down}
                      padding="py-xxxs px-xs"
                      defaultValue={Metrics.number_of_requests.value}
                      gap="gap-xxs"
                      width="min-w-[140px]"
                      value={Metrics.number_of_requests.value}
                      choices={[
                        {
                          name: Metrics.number_of_requests.name,
                          value: Metrics.number_of_requests.value,
                        },
                        {
                          name: Metrics.error_count.name,
                          value: Metrics.error_count.value,
                        },
                        {
                          name: Metrics.total_cost.name,
                          value: Metrics.total_cost.value,
                        },
                        {
                          name: Metrics.average_latency.name,
                          value: Metrics.average_latency.value,
                        },
                        {
                          name: Metrics.output_token_count.name,
                          value: Metrics.output_token_count.value,
                        },
                        {
                          name: Metrics.total_prompt_tokens.name,
                          value: Metrics.total_prompt_tokens.value,
                        },
                        {
                          name: Metrics.total_token_count.name,
                          value: Metrics.total_token_count.value,
                        },
                      ]}
                    />
                  </div>
                  <div className="flex justify-between items-center self-stretch ">
                    <span className="text-sm-regular text-gray-4">Type</span>
                    <SelectInput
                      {...register("type")}
                      headLess
                      placeholder="Total"
                      align="start"
                      icon={Down}
                      padding="py-xxxs px-xs"
                      gap="gap-xxs"
                      width="min-w-[140px]"
                      defaultValue="total"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      choices={typeChoices}
                    />
                  </div>
                  <div className="flex justify-between items-center self-stretch ">
                    <span className="text-sm-regular text-gray-4">
                      Breakdown
                    </span>
                    <SelectInput
                      {...register("breakdown")}
                      headLess
                      placeholder="None"
                      align="start"
                      icon={Down}
                      padding="py-xxxs px-xs"
                      gap="gap-xxs"
                      width="min-w-[140px]"
                      defaultValue="none"
                      value={breakdown}
                      onChange={(e) => setBreakdown(e.target.value)}
                      choices={filteredBreakdownChoices}
                    />
                  </div>
                </div>
                <Button variant="text" text="Apply" textColor="text-primary" />
              </form>
            </Popover>

            <div className="w-[1px] h-[28px] shadow-border shadow-gray-2 "></div>
            <DotsButton
              icon={sideBar}
              bgColor="bg-gray-2"
              onClick={() => handleClick("Request")}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <DashboardChart />
          {isPanel && (
            <PanelGraph
              metric={panelData}
              number={MetricNumber(panelData)}
              type={calculation_type}
            />
          )}
        </div>
      </div>
    );
}

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardNotConnected);
