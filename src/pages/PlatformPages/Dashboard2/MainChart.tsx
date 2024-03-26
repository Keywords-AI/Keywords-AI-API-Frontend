import React from "react";
import { ChartContainer } from "./ChartContainer";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import KeywordsLineChart from "src/components/Display/KeywordsLineChart";
import { Metrics } from "src/utilities/constants";
import { defultTheme } from "src/components/styles/color-themes";
import { removeFromDisplayCharts } from "src/store/actions";
import { DropDownMenu } from "src/components/Dialogs/DropDownMenu";
import { Button, Down } from "src/components";

type Props = {};

export default function MainChart({}: Props) {
  const dispatch = useTypedDispatch();
  const dashboardData = useTypedSelector((state) => state.dashboard);
  const displayFilter = useTypedSelector(
    (state) => state.dashboard.displayFilter
  );
  const displayCharts = useTypedSelector(
    (state) => state.dashboard.displayCharts
  );
  const displayData = {
    number_of_requests: {
      calculation: "first",
      name: "Request",
      value: "number_of_requests",
      focusData: dashboardData.requestCountData,
      colors: {
        number_of_requests: defultTheme.extend.colors.primary,
        error_count: defultTheme.extend.colors.error,
      },
    },
    average_latency: {
      calculation: "average",
      name: "Generation time",
      value: "average_latency",
      focusData: dashboardData.latencyData,
      colors: {
        average_latency: defultTheme.extend.colors.primary,
        latency_p_50: defultTheme.extend.colors.gray[3],
        latency_p_90: defultTheme.extend.colors.gray[3],
        latency_p_95: defultTheme.extend.colors.gray[3],
        latency_p_99: defultTheme.extend.colors.gray[3],
      },
    },
    average_ttft: {
      calculation: "average",
      name: "TTFT",
      value: "average_ttft",
      focusData: dashboardData.ttftData,
      colors: {
        average_ttft: defultTheme.extend.colors.primary,
        ttft_p_50: defultTheme.extend.colors.gray[3],
        ttft_p_90: defultTheme.extend.colors.gray[3],
        ttft_p_95: defultTheme.extend.colors.gray[3],
        ttft_p_99: defultTheme.extend.colors.gray[3],
      },
    },

    total_prompt_tokens: {
      calculation: "first",
      name: "Prompt tokens",
      value: "total_prompt_tokens",
      focusData: dashboardData.promptTokenCountData,
      colors: {
        total_prompt_tokens: defultTheme.extend.colors.primary,
      },
    },
    total_completion_tokens: {
      calculation: "first",
      name: "Output tokens",
      value: "total_completion_tokens",
      focusData: dashboardData.completionTokenCountData,
      colors: {
        total_completion_tokens: defultTheme.extend.colors.primary,
      },
    },
    total_tokens: {
      calculation: "first",
      name: "All tokens",
      value: "total_tokens",
      focusData: dashboardData.tokenCountData,
      colors: {
        total_tokens: defultTheme.extend.colors.primary,
      },
    },
    average_tps: {
      calculation: "average",
      name: "Speed",
      value: "average_tps",
      focusData: dashboardData.tpsData,
      colors: {
        average_tps: defultTheme.extend.colors.primary,
        tps_p_50: defultTheme.extend.colors.gray[3],
        tps_p_90: defultTheme.extend.colors.gray[3],
        tps_p_95: defultTheme.extend.colors.gray[3],
        tps_p_99: defultTheme.extend.colors.gray[3],
      },
    },
    tps_p_50: {
      calculation: "first",
      name: "Speed p50",
      value: "tps_p_50",
      focusData: dashboardData.tpsData,
      colors: {
        tps_p_50: defultTheme.extend.colors.primary,
      },
    },
    tps_p_90: {
      calculation: "first",
      name: "Speed p90",
      value: "tps_p_90",
      focusData: dashboardData.tpsData,
      colors: {
        tps_p_90: defultTheme.extend.colors.primary,
      },
    },
    tps_p_95: {
      calculation: "first",
      name: "Speed p95",
      value: "tps_p_95",
      focusData: dashboardData.tpsData,
      colors: {
        tps_p_95: defultTheme.extend.colors.primary,
      },
    },
    tps_p_99: {
      calculation: "first",
      name: "Speed p99",
      value: "tps_p_99",
      focusData: dashboardData.tpsData,
      colors: {
        tps_p_99: defultTheme.extend.colors.primary,
      },
    },
    total_cost: {
      calculation: "first",
      name: "Cost",
      value: "total_cost",
      focusData: dashboardData.costData,
      colors: {
        total_cost: defultTheme.extend.colors.primary,
      },
    },
    error_count: {
      calculation: "first",
      name: "Errors",
      value: "error_count",
      focusData: dashboardData.errorCountData,
      colors: {
        error_count: defultTheme.extend.colors.error,
      },
    },
    latency_p_50: {
      calculation: "first",
      name: "Generation time p50",
      value: "latency_p_50",
      focusData: dashboardData.latencyData,
      colors: {
        latency_p_50: defultTheme.extend.colors.primary,
      },
    },
    latency_p_90: {
      calculation: "first",
      name: "Generation time p90",
      value: "latency_p_90",
      focusData: dashboardData.latencyData,
      colors: {
        latency_p_90: defultTheme.extend.colors.primary,
      },
    },
    latency_p_95: {
      calculation: "first",
      name: "Generation time p95",
      value: "latency_p_95",
      focusData: dashboardData.latencyData,
      colors: {
        latency_p_95: defultTheme.extend.colors.primary,
      },
    },
    latency_p_99: {
      calculation: "first",
      name: "Generation time p99",
      value: "latency_p_99",
      focusData: dashboardData.latencyData,
      colors: {
        latency_p_99: defultTheme.extend.colors.primary,
      },
    },
    ttft_p_50: {
      calculation: "first",
      name: "TTFT p50",
      value: "ttft_p_50",
      focusData: dashboardData.ttftData,
      colors: {
        ttft_p_50: defultTheme.extend.colors.primary,
      },
    },
    ttft_p_90: {
      calculation: "first",
      name: "TTFT p90",
      value: "ttft_p_90",
      focusData: dashboardData.ttftData,
      colors: {
        ttft_p_90: defultTheme.extend.colors.primary,
      },
    },
    ttft_p_95: {
      calculation: "first",
      name: "TTFT p95",
      value: "ttft_p_95",
      focusData: dashboardData.ttftData,
      colors: {
        ttft_p_95: defultTheme.extend.colors.primary,
      },
    },
    ttft_p_99: {
      calculation: "first",
      name: "TTFT p99",
      value: "ttft_p_99",
      focusData: dashboardData.ttftData,
      colors: {
        ttft_p_99: defultTheme.extend.colors.primary,
      },
    },
    average_cost: {
      calculation: "first",
      name: "Average cost",
      value: "average_cost",
      focusData: dashboardData.avgCostData,
      colors: {
        average_cost: defultTheme.extend.colors.primary,
      },
    },
    average_tokens: {
      calculation: "first",
      name: "Average tokens",
      value: "average_tokens",
      focusData: dashboardData.avgTokenCountData,
      colors: {
        average_tokens: defultTheme.extend.colors.primary,
      },
    },
    average_completion_tokens: {
      calculation: "first",
      name: "Average output tokens",
      value: "average_completion_tokens",
      focusData: dashboardData.avgCompletionTokenCountData,
      colors: {
        average_completion_tokens: defultTheme.extend.colors.primary,
      },
    },
    average_prompt_tokens: {
      calculation: "first",
      name: "Average prompt tokens",
      value: "average_prompt_tokens",
      focusData: dashboardData.avgPromptTokenCountData,
      colors: {
        average_prompt_tokens: defultTheme.extend.colors.primary,
      },
    },
  };
  if (dashboardData.loading) return null;
  return (
    <>
      <div className="flex px-lg py-md items-start gap-xl h-[268px]">
        <ChartContainer
          title={Metrics.number_of_requests.name}
          summary={dashboardData.summary[displayFilter.metric]}
          // rightContent={<div>hi</div>}
        >
          <KeywordsLineChart
            data={displayData[displayFilter.metric].focusData}
            colors={displayData[displayFilter.metric].colors}
            metric={Metrics.number_of_requests.value}
          />
        </ChartContainer>
      </div>
      <div className="flex  py-md px-lg  items-start content-start gap-y-xl self-stretch flex-wrap gap-x-xs">
        {displayCharts.map((chart, index) => {
          return (
            <ChartDisplay
              key={index}
              index={index}
              chart={chart}
              dashboardData={dashboardData}
              displayData={displayData}
            />
          );
        })}
      </div>
    </>
  );
}

const ChartDisplay = ({ index, chart, dashboardData, displayData }) => {
  const [open, setOpen] = React.useState(false);
  let hasSubSelector = [
    "average_latency",
    "average_ttft",
    "average_tps",
  ].includes(chart);
  let noDigits = [
    "total_tokens",
    "total_prompt_tokens",
    "total_completion_tokens",
    "error_count",
  ].includes(chart);
  let hasPreUnits = ["average_cost", "total_cost"].includes(chart);
  let hasPostUnits = [
    "average_latency",
    "average_ttft",
    "average_tps",
    "tps_p_50",
    "tps_p_90",
    "tps_p_95",
    "tps_p_99",
    "latency_p_50",
    "latency_p_90",
    "latency_p_95",
    "latency_p_99",
    "ttft_p_50",
    "ttft_p_90",
    "ttft_p_95",
    "ttft_p_99",
  ].includes(chart);
  const [dataKey, setDataKey] = React.useState(
    hasSubSelector ? Object.keys(displayData[chart].colors)[0] : null
  );

  const dispatch = useTypedDispatch();

  const SelectctorMenu = ({ dataKey, setDataKey }) => {
    // if (!hasSubSelector || !dataKey) return null;
    if (!dataKey) return null;
    return (
      <DropDownMenu
        open={open}
        setOpen={setOpen}
        width="w-full"
        trigger={
          <Button
            variant="text"
            text={dataKey == "all" ? "All" : Metrics[dataKey]?.name || ""}
            icon={Down}
            iconPosition="right"
          />
        }
        items={
          <>
            {Object.keys(displayData[chart].colors).map((key, index) => {
              return (
                <Button
                  key={index}
                  text={Metrics[key].name}
                  variant="panel"
                  onClick={() => {
                    setDataKey(key);
                    setOpen(false);
                  }}
                />
              );
            })}
            <Button
              text={"All"}
              variant="panel"
              onClick={() => {
                setDataKey("all");
                setOpen(false);
              }}
            />
          </>
        }
      />
    );
  };
  let summary = noDigits
    ? (dashboardData.summary[chart] || 0).toLocaleString()
    : (dashboardData.summary[chart] || 0).toFixed(2);

  hasPreUnits ? (summary = "$" + summary) : summary;

  return (
    <div
      className="w-[calc((100%-24px)/3)] h-[280px]"
      key={index}
      // onClick={() => dispatch(removeFromDisplayCharts(chart))}
    >
      <ChartContainer
        title={Metrics[chart].name}
        summary={summary}
        rightContent={
          hasSubSelector ? (
            <SelectctorMenu dataKey={dataKey} setDataKey={setDataKey} />
          ) : null
        }
        postUnits={hasPostUnits}
      >
        <KeywordsLineChart
          data={displayData[chart].focusData}
          colors={displayData[chart].colors}
          dataKey={
            dataKey ? (dataKey == "all" ? undefined : dataKey) : undefined
          }
          metric={displayData[chart].value}
        />
      </ChartContainer>
    </div>
  );
};
