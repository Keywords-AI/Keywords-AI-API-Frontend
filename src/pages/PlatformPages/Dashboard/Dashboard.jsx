import React, { useEffect, useState } from "react";
import MetricCard from "src/components/Cards/MetricCard";
import { Display, Down, SideBar, SideBarActive } from "src/components/Icons";
import { setQueryParams } from "src/utilities/navigation";
import { TitleAuth, TitleStaticSubheading } from "src/components/Titles";
import { DashboardChart, SentimentChart } from "src/components/Display";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getDashboardData,
  setDateData,
  setDisplayBreakdown,
  setDisplayMetric,
  setDisplayTimeRange,
  setDisplayType,
} from "src/store/actions";
import { useNavigate, useLocation, Form, useParams } from "react-router-dom";
import { Button } from "src/components";
import { SelectInput } from "src/components/Inputs";
import { DotsButton } from "src/components/Buttons";
import { useForm } from "react-hook-form";
import { Popover } from "src/components/Dialogs";
import { Metrics, colorTagsClasses } from "src/utilities/constants";
import { PanelGraph } from "src/components/Sections";
import cn from "src/utilities/classMerge";
import { WelcomeState } from "src/components/Sections";
import DashboardFilter from "./DashboardFilter";

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
  modelData: state.dashboard.modelData,
  modelColors: state.dashboard.modelColors,
  keyColors: state.dashboard.keyColors,
});
const mapDispatchToProps = {
  getDashboardData,
  setDateData,
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
  modelData,
  modelColors,
  keyColors,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const [showPopover, setShowPopover] = useState(false);
  const [isPanel, setIsPanel] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const useKeyboardShortcut = (shortcutKeys, callback) => {};
  const performance_param = new URLSearchParams(location.search).get("metric");
  const breakdown_type = new URLSearchParams(location.search).get("breakdown");
  useEffect(() => {
    getDashboardData();
  }, [firstName, performance_param, breakdown_type]);

  const handleOpenPanel = () => {
    setIsPanel((prevIsPanel) => !prevIsPanel);
  };

  const handleTimePeriodSelection = (selectedValue) => {
    dispatch(setDisplayTimeRange(selectedValue, setQueryParams, navigate));
    getDashboardData();
  };

  const handleCardClick = (metricKey) => {
    setActiveCard(activeCard === metricKey ? null : metricKey);
  };
  let colorData = [];
  if (breakdown_type !== "none") {
    colorData = breakdown_type === "by_model" ? modelColors : keyColors;
  }

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
    { name: "Total", value: "total", secText: "1" },
    { name: "Average", value: "average", secText: "2" },
  ];

  const breakdownChoices = [
    { name: "None", value: "none", secText: "1" },
    {
      name: "By model",
      value: "by_model",
      secText: "2",
    },
    { name: "By key", value: "by_key", secText: "3" },
    // { name: "By token type", value: "by_token_type" }, //only for total tokens
  ];
  let filteredtypeChoices;
  if (
    currentMetric === "number_of_requests" ||
    currentMetric === "error_count"
  ) {
    filteredtypeChoices = typeChoices.filter(
      (choice) => choice.value !== "average"
    );
  } else {
    filteredtypeChoices = typeChoices;
  }

  // currentMetric === "number_of_requests" ||
  //                             currentMetric === "error_count"
  //                               ? typeChoices.filter((choice) => choice.value !== "average")
  //                               : typeChoices;

  const filteredBreakdownChoices = breakdownChoices;
  // currentMetric === "total_tokens" ||
  // currentMetric === "total_prompt_tokens"
  //   ? breakdownChoices.filter((choice) => choice.value !== "by_token_type")
  //   : breakdownChoices;

  // const filteredMetricsChoices = currentType === "total" ? metrics.filter((metric) => metric.dataKey !== "average_latency") : metrics;
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
            <MetricCard
              key={index}
              {...metric}
              isActive={activeCard === metric.dataKey}
              onClick={() => {
                handleCardClick(metric.dataKey);
                metric.onClick(); // Call the original onClick function
              }}
            />
          ))}
        </div>
        <div className="flex flex-row py-xs px-lg justify-between items-center self-stretch shadow-border shadow-gray-2 w-full">
          {
            <div>
              {breakdown_type !== "none" && (
                <div className="flex items-center content-center gap-xs flex-wrap">
                  {colorData &&
                    Object.keys(colorData).map((name, index) => (
                      <div className="flex items-center gap-xxs" key={index}>
                        <div
                          className={cn("w-[8px] h-[8px] rounded-[2px] ")}
                          style={{
                            backgroundColor:
                              colorTagsClasses[index % colorTagsClasses.length],
                          }}
                        ></div>
                        <span className="caption text-gray-4">
                          {name || "unknown model"}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          }
          <div className="flex items-center gap-xxs">
            <DashboardFilter />
            <div className="w-[1px] h-[28px] shadow-border shadow-gray-2 "></div>
            <DotsButton
              icon={isPanel ? SideBarActive : SideBar}
              onClick={() => handleOpenPanel()}
            />
          </div>
        </div>
        <div className="flex flex-row h-full">
          <div className="flex flex-col w-full h-full">
            <DashboardChart />
          </div>
          {isPanel && <PanelGraph />}
        </div>
      </div>
    );
}

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardNotConnected);
