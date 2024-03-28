import { useState } from "react";
import { CircleCheck, CircleAdd } from "src/components";
import KeywordsLineChart from "src/components/Display/KeywordsLineChart";
import { useTypedSelector } from "src/store/store";
import cn from "src/utilities/classMerge";
import { ChartContainer } from "./ChartContainer";

export const UserSelection = ({ displayData, select, setSelect }) => {
const dashboardData = useTypedSelector((state) => state.dashboard);

// const [select, setSelect] = useState(modelDisplayCharts);
const chartOptions = Object.values(displayData).filter(
    (item: any) =>
        item.value === "total_users" ||
        item.value === "active_users" ||
        item.value === "average_cost_per_user" ||
        item.value === "average_user_sentiment"
);

  return (
    <>
      <div className="flex items-center gap-xxs self-stretch display-xs text-gray-5">
        Models
      </div>
      <div className="flex w-full h-full justify-start items-start content-start gap-xxs flex-wrap">
        {chartOptions.map((chart: any, index) => {
          let noDigits = [
            "total_tokens",
            "total_prompt_tokens",
            "total_completion_tokens",
            "error_count",
          ].includes(chart.value);
          let hasPreUnits = ["average_cost", "total_cost"].includes(
            chart.value
          );
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
          ].includes(chart.value);
          return (
            <div
              key={index}
              className={cn(
                "flex-col w-[280px] h-[200px] p-sm items-start gap-[6px] hover:bg-gray-2 relative rounded-md border border-solid border-gray-3",
                select.includes(chart.value) && "bg-gray-2"
              )}
            >
              <div
                className="absolute inset-0  z-[2] cursor-pointer"
                onClick={() => {
                  if (select.includes(chart.value)) {
                    setSelect((p) => p.filter((item) => item !== chart.value));
                  } else {
                    setSelect((p) => [...new Set([...p, chart.value])]);
                  }
                }}
              ></div>
              <ChartContainer
                small
                title={chart.name}
                summary={
                  (hasPreUnits ? "$" : "") +
                  (noDigits
                    ? (dashboardData.summary[chart] || 0).toLocaleString()
                    : (dashboardData.summary[chart] || 0).toFixed(2))
                }
                rightContent={
                  select.includes(chart.value) ? <CircleCheck /> : <CircleAdd />
                }
                postUnits={hasPostUnits}
              >
                <KeywordsLineChart
                  data={displayData[chart.value].focusData}
                  colors={displayData[chart.value].colors}
                  disableTooltip
                />
              </ChartContainer>
            </div>
          );
        })}
      </div>
    </>
  );
};