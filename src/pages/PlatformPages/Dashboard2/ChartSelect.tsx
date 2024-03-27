import React, { useEffect, useState } from "react";
import { Add, CircleAdd, CircleCheck, Pencil } from "src/components";
import { Button, DotsButton } from "src/components/Buttons";
import { Modal } from "src/components/Dialogs";
import { defultTheme } from "src/components/styles/color-themes";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { ChartContainer } from "./ChartContainer";
import KeywordsLineChart from "src/components/Display/KeywordsLineChart";
import cn from "src/utilities/classMerge";
import { setModelsDisplayCharts } from "src/store/actions";
import _ from "lodash";
import { ModelSection } from "./ModelSection";
type Props = {};

export default function ChartSelect({}: Props) {
  const [open, setOpen] = useState(false);
  const dispatch = useTypedDispatch();
  const dashboardData = useTypedSelector((state) => state.dashboard);
  const [select, setSelect] = useState(dashboardData.modelDisplayCharts);
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
      name: "Average completion tokens",
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

  const handleSubmit = () => {
    dispatch(setModelsDisplayCharts([...select]));
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      setOpen={(o) => {
        setOpen(o);
      }}
      title=""
      trigger={<DotsButton icon={Pencil} />}
      width="w-[930px]"
      height="h-[800px]"
      backgroundColor="bg-gray-1"
    >
      <div className=" flex-col gap-md h-[736px] self-stretch overflow-auto">
        <div className="flex flex-col overflow-auto self-stretch flex-1  gap-md ">
          <div className="flex-col w-full  gap-md h-[900px] shrink-0">
            <ModelSection
              displayData={displayData}
              select={select}
              setSelect={setSelect}
            />
          </div>
          <ModelSection
            displayData={displayData}
            select={select}
            setSelect={setSelect}
          />
        </div>
        <div className="flex items-center justify-end gap-xs self-stretch shrink-0">
          <Button
            variant="r4-gray-2"
            text="Cancel"
            onClick={() => setOpen(false)}
          />
          <Button variant="r4-primary" text="Save" onClick={handleSubmit} />
        </div>
      </div>
    </Modal>
  );
}
