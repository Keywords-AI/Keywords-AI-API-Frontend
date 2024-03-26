import React, { useState } from "react";
import { Pencil } from "src/components";
import { Button, DotsButton } from "src/components/Buttons";
import { Modal } from "src/components/Dialogs";
import { defultTheme } from "src/components/styles/color-themes";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { ChartContainer } from "./ChartContainer";
import KeywordsLineChart from "src/components/Display/KeywordsLineChart";
import cn from "src/utilities/classMerge";
import { setDisplayCharts } from "src/store/actions";

type Props = {};

export default function ChartSelect({}: Props) {
  const [open, setOpen] = useState(false);
  const dispatch = useTypedDispatch();
  const dashboardData = useTypedSelector((state) => state.dashboard);
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
  console.log("heyeudfebf",dashboardData.promptTokenCountData);
  const chartOptions = Object.values(displayData).filter(
    (item) =>
      !displayCharts.includes(item.value) &&
      !item.value.endsWith("p_50") &&
      !item.value.endsWith("p_90") &&
      !item.value.endsWith("p_95") &&
      !item.value.endsWith("p_99") &&
      item.value !== "number_of_requests"
  );
  const [select, setSelect] = useState<string[]>([]);
  const handleSubmit = () => {
    dispatch(setDisplayCharts([...displayCharts, ...select]));
    setOpen(false);
  };
  
  return (
    <Modal
      open={open}
      setOpen={(o) => {
        setOpen(o);
        setSelect([]);
      }}
      title="Add graphs"
      trigger={<DotsButton icon={Pencil} />}
      width="w-[calc(100vw-60px)]"
      height="h-[calc(100vh-60px)]"
      backgroundColor="bg-gray-1"
    >
      <div className="flex w-full h-full justify-center items-start content-start gap-[20px] flex-wrap overflow-auto">
        {chartOptions.map((chart, index) => {
          return (
            <div
              key={index}
              className={cn(
                "flex-col w-1/4 h-1/4 p-xxs items-start gap-[6px] hover:bg-gray-2 relative",
                select.includes(chart.value) && "bg-gray-2"
              )}
            >
              <div
                className="absolute inset-0 bg-opacity-50 z-[2] cursor-pointer"
                onClick={() =>
                  setSelect((p) => [...new Set([...p, chart.value])])
                }
              ></div>
              <ChartContainer
                small
                title={chart.name}
                summary={dashboardData.summary[chart.value]?.toFixed(2)}
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
      <div className="flex items-center justify-between gap-xs">
        <Button
          variant="r4-gray-2"
          text="Cancel"
          onClick={() => setOpen(false)}
        />
        <Button variant="r4-primary" text="Save" onClick={handleSubmit} />
      </div>
    </Modal>
  );
}
