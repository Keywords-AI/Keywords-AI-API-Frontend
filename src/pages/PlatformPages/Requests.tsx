import React, { FunctionComponent, useEffect, useState } from "react";
import { connect, ConnectedComponent, DispatchProp } from "react-redux";
import { RootState } from "src/types";
import { SettingTable } from "src/components/Tables";
import { getDashboardData } from "src/store/actions";
import { getRequestLogs } from "src/store/actions";
import { LogItem } from "src/types";
import { useNavigate } from "react-router-dom";
import { TitleAuth } from "src/components/Titles";
import { Button, Display, Down, Filter, Search } from "src/components";
import { TextInputSmall } from "src/components/Inputs/TextInput/TextInputSmall";
import { SelectInput } from "src/components/Inputs";
import { Metrics, colorTagsClasses } from "src/utilities/constants";
import { Popover } from "src/components/Dialogs";
import { useForm } from "react-hook-form";

const mapStateToProps = (state: RootState) => ({
  requestLogs: state.requestLogs.data as LogItem[],
  firstTime: !state.organization?.has_api_call ?? false,
});

const mapDispatchToProps = {
  getDashboardData,
  getRequestLogs,
};

interface Actions {
  getDashboardData: (overrideParams?: any) => void;
  getRequestLogs: () => void;
}

type UsageLogsProps = ReturnType<typeof mapStateToProps> & Actions;

const WelcomeState: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-col flex-1 self-stretch p-lg gap-lg items-start bg-gray-1 ">
      <div className="flex-col justify-center items-center gap-md flex-1 self-stretch rounded-md shadow-window outline outline-1 outline-gray-3">
        <TitleAuth
          title="Welcome to Keywords AI!"
          subtitle={"Send your first API call to view your requests log."}
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

export const RequestsNotConnected: FunctionComponent<UsageLogsProps> = ({
  requestLogs,
  getDashboardData,
  getRequestLogs,
  firstTime,
}) => {
  useEffect(() => {
    getRequestLogs();
  }, []);
  const [inputValue, setInputValue] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const { register, handleSubmit, watch } = useForm();

  if (firstTime) return <WelcomeState />;
  else
    return (
      <div className="flex flex-col items-start self-stretch flex-grow rounded-xs bg-gray-1">
        <div className="flex flex-row py-xs px-lg justify-between items-center self-stretch rounded-xs shadow-border-b-2">
          <div className="flex flex-row items-center gap-xxxs">
            <Button variant="small" icon={Filter} text="Filter" />
          </div>
          <div className="flex flex-row gap-xxxs rounded-xs">
            <TextInputSmall
              icon={Search}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button variant="small" text="Today" />
            <SelectInput
              headLess
              placeholder="Month"
              align="end"
              // value={currentTimeRange}
              icon={Down}
              padding="py-xxxs px-xxs"
              gap="gap-xxs"
              choices={[
                { name: "Day", value: "daily" },
                { name: "Week", value: "weekly" },
                { name: "Month", value: "monthly" },
                { name: "Year", value: "yearly" },
              ]}
              // handleSelected={handleTimePeriodSelection}
            />
            <Popover
              trigger={
                <Button
                  variant="small"
                  text="Display"
                  icon={Display}
                  secIcon={Down}
                  secIconPosition="right"
                  // onClick={() => setShowPopover((prev) => !prev)}
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
                      // onChange={(e) => {
                      //   dispatch(
                      //     setDisplayMetric(
                      //       e.target.value,
                      //       setQueryParams,
                      //       navigate
                      //     )
                      //   );
                      //   getDashboardData();
                      // }}
                      // value={currentMetric}
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
                          name: Metrics.average_latency.name,
                          value: Metrics.average_latency.value,
                        },
                        {
                          name: Metrics.total_cost.name,
                          value: Metrics.total_cost.value,
                        },
                        {
                          name: Metrics.total_tokens.name,
                          value: Metrics.total_tokens.value,
                        },
                        {
                          name: Metrics.total_completion_tokens.name,
                          value: Metrics.total_completion_tokens.value,
                        },
                        {
                          name: Metrics.total_prompt_tokens.name,
                          value: Metrics.total_prompt_tokens.value,
                        },
                      ]}
                    />
                  </div>
                      <div className="flex justify-between items-center self-stretch ">
                        <span className="text-sm-regular text-gray-4">
                          Type
                        </span>
                        <SelectInput
                          {...register("type")}
                          headLess
                          placeholder="Total"
                          align="start"
                          icon={Down}
                          padding="py-xxxs px-xxs"
                          gap="gap-xxs"
                          width="min-w-[140px]"
                          // value={currentType}
                          // onChange={(e) =>
                          //   dispatch(
                          //     setDisplayType(
                          //       e.target.value,
                          //       setQueryParams,
                          //       navigate
                          //     )
                          //   )
                          // }
                          // choices={filteredtypeChoices}
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
                      // value={currentBreakdown}
                      // onChange={(e) =>
                      //   dispatch(
                      //     setDisplayBreakdown(
                      //       e.target.value,
                      //       setQueryParams,
                      //       navigate
                      //     )
                      //   )
                      // }
                      // choices={filteredBreakdownChoices}
                    />
                  </div>
                </div>
              </form>
            </Popover>

          </div>
        </div>
      </div>
      // <div className="flex-col flex-grow self-stretch">
      //   <SettingTable
      //     headers={[
      //       "Time",
      //       "Prompt tokens",
      //       "Completion tokens",
      //       "Latency",
      //       "Cost",
      //       "Status",
      //       "Category",
      //     ]}
      //     headerLayout={"grid-cols-8"}
      //     rows={requestLogs}
      //     rowLayout={"grid-cols-8"}
      //     columnNames={[
      //       "timestamp",
      //       "prompt_tokens",
      //       "completion_tokens",
      //       "latency",
      //       "cost",
      //       "status",
      //       "category",
      //     ]}
      //   />
      // </div>
    );
};

export const Requests = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestsNotConnected);
