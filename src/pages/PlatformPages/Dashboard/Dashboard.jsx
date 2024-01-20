import React, { useEffect, useState } from "react";
import MetricCard from "src/components/Cards/MetricCard";
import { Display, Down, SideBar, SideBarActive } from "src/components/Icons";
import { setQueryParams } from "src/utilities/navigation";
import { TitleAuth, TitleStaticSubheading } from "src/components/Titles";
import { DashboardChart } from "src/components/Display";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getDashboardData,
  setDateData,
  setDisplayBreakdown,
  setDisplayMetric,
  setDisplayTimeRange,
  setDisplayType,
  setPanelData,
} from "src/store/actions";
import { useNavigate, useLocation, Form } from "react-router-dom";
import { Button } from "src/components";
import { SelectInput } from "src/components/Inputs";
import { DotsButton } from "src/components/Buttons";
import { useForm } from "react-hook-form";
import { Popover } from "src/components/Dialogs";
import { Metrics } from "src/utilities/constants";
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
  promptTokenCountData: state.dashboard.promptTokenCountData,
  completionTokenCountData: state.dashboard.completionTokenCountData,
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
          textAlign="text-center"
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
  firstName,
  requestCountData,
  latencyData,
  promptTokenCountData,
  completionTokenCountData,
  costData,
  getDashboardData,
  firstTime,
  organization,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const [showPopover, setShowPopover] = useState(false);
  const [isPanel, setIsPanel] = useState(false);

  useEffect(() => {
    getDashboardData();
  }, []);

  const handleOPenPanel = () => {
    setIsPanel((prevIsPanel) => !prevIsPanel);
  };

  const handleTimePeriodSelection = (selectedValue) => {
    dispatch(setDisplayTimeRange(selectedValue, setQueryParams, navigate));
    getDashboardData();
  };

  const metrics = [
    {
      title: Metrics.number_of_requests.name,
      number: summary.number_of_requests,
      chartData: requestCountData,
      dataKey: Metrics.number_of_requests.value,
      onClick: () => {
        dispatch(
          setDisplayMetric(
            Metrics.number_of_requests.value,
            setQueryParams,
            navigate
          )
        );
        getDashboardData();
      },
    },
    {
      title: Metrics.average_latency.name,
      number: `${summary.average_latency?.toFixed(3) || 0}`,
      chartData: latencyData,
      dataKey: Metrics.average_latency.value,
      unit: true,
      onClick: () => {
        dispatch(
          setDisplayMetric(
            Metrics.average_latency.value,
            setQueryParams,
            navigate
          )
        );
        getDashboardData();
      },
    },
    {
      title: Metrics.total_prompt_tokens.name,
      number: summary.total_prompt_tokens || 0,
      chartData: promptTokenCountData,
      dataKey: Metrics.total_prompt_tokens.value,
      onClick: () => {
        dispatch(
          setDisplayMetric(
            Metrics.total_prompt_tokens.value,
            setQueryParams,
            navigate
          )
        );
        getDashboardData();
      },
    },
    {
      title: Metrics.total_completion_tokens.name,
      number: summary.total_completion_tokens || 0,
      chartData: completionTokenCountData,
      dataKey: Metrics.total_completion_tokens.value,
      onClick: () => {
        dispatch(
          setDisplayMetric(
            Metrics.total_completion_tokens.value,
            setQueryParams,
            navigate
          )
        );
        getDashboardData();
      },
    },
    {
      title: Metrics.total_cost.name,
      number: `$${summary.total_cost?.toFixed(3) || 0}`,
      chartData: costData,
      dataKey: Metrics.total_cost.value,
      onClick: () => {
        dispatch(
          setDisplayMetric(Metrics.total_cost.value, setQueryParams, navigate)
        );
        getDashboardData();
      },
    },
  ];
  const currentMetric = useSelector(
    (state) => state.dashboard.displayFilter.metric
  );
  const currentType = useSelector(
    (state) => state.dashboard.displayFilter.type
  );
  const currentBreakdown = useSelector(
    (state) => state.dashboard.displayFilter.breakDown
  );
  const currentTimeRange = useSelector(
    (state) => state.dashboard.displayFilter.timeRange
  );

  const typeChoices = [
    { name: "Total", value: "total" },
    { name: "Average", value: "average" },
  ];

  const breakdownChoices = [
    { name: "None", value: "none" },
    {
      name: "By model",
      value: "by_model",
    },
    { name: "By key", value: "by_key" },
    { name: "By token type", value: "by_token_type" }, //only for total tokens
  ];

  const filteredBreakdownChoices =
    currentMetric === "output_token_count" ||
    currentMetric === "prompt_token_count"
      ? breakdownChoices.filter((choice) => choice.value !== "by_token_type")
      : breakdownChoices;

  if (firstTime !== undefined && firstTime) return <WelcomeState />;
  else
    return (
      <div className="flex flex-col w-full h-full">
        <div className="grid grid-cols-6 pl-lg items-start self-stretch">
          <div className="flex flex-col py-md items-start gap-xxs self-stretch">
            <span className="text-sm-md text-gray-4">{organization?.name}</span>
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
            <Button
              variant="small"
              text="Today"
              onClick={() => handleTimePeriodSelection("daily")}
            />
            <SelectInput
              headLess
              placeholder="Month"
              align="end"
              value={currentTimeRange}
              icon={Down}
              padding="py-xxxs px-xxs"
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
              width="w-[320px]"
            >
              <form className={"flex flex-col gap-xxs items-end"}>
                <div className="flex flex-col items-start gap-xxs self-stretch">
                  <div className="flex justify-between items-center self-stretch ">
                    <span className="text-sm-regular text-gray-4">Metric</span>
                    <SelectInput
                      {...register("metric")}
                      headLess
                      placeholder="Request"
                      align="start"
                      icon={Down}
                      padding="py-xxxs px-xxs"
                      gap="gap-xxs"
                      width="min-w-[140px]"
                      onChange={(e) => {
                        dispatch(
                          setDisplayMetric(
                            e.target.value,
                            setQueryParams,
                            navigate
                          )
                        );
                        getDashboardData();
                      }}
                      value={currentMetric}
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
                          name: Metrics.total_completion_tokens.name,
                          value: Metrics.total_completion_tokens.value,
                        },
                        {
                          name: Metrics.total_prompt_tokens.name,
                          value: Metrics.total_prompt_tokens.value,
                        },
                        {
                          name: Metrics.total_tokens.name,
                          value: Metrics.total_tokens.value,
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
                      padding="py-xxxs px-xxs"
                      gap="gap-xxs"
                      width="min-w-[140px]"
                      value={currentType}
                      onChange={(e) =>
                        dispatch(
                          setDisplayType(
                            e.target.value,
                            setQueryParams,
                            navigate
                          )
                        )
                      }
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
                      padding="py-xxxs px-xxs"
                      gap="gap-xxs"
                      width="min-w-[140px]"
                      value={currentBreakdown}
                      onChange={(e) =>
                        dispatch(
                          setDisplayBreakdown(
                            e.target.value,
                            setQueryParams,
                            navigate
                          )
                        )
                      }
                      choices={filteredBreakdownChoices}
                    />
                  </div>
                </div>
              </form>
            </Popover>

            <div className="w-[1px] h-[28px] shadow-border shadow-gray-2 "></div>
            <DotsButton
              icon={isPanel ? SideBarActive : SideBar}
              bgColor="bg-gray-2"
              onClick={() => handleOPenPanel()}
            />
          </div>
        </div>
        <div className="flex flex-row h-full">
          <DashboardChart />
          {isPanel && <PanelGraph />}
        </div>
      </div>
    );
}

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardNotConnected);
