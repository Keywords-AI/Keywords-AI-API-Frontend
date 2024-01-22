import React, { FunctionComponent, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "src/types";
import {
  getDashboardData,
  setDisplayBreakdown,
  setDisplayMetric,
  setDisplayTimeRange,
  setDisplayType,
} from "src/store/actions";
import { getRequestLogs } from "src/store/actions";
import { LogItem } from "src/types";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Add,
  Button,
  Close,
  Copy,
  Display,
  Divider,
  Dots,
  Down,
  Export,
  Filter,
  Search,
} from "src/components";
import { SideBar, SideBarActive } from "src/components/Icons";
import { TextInputSmall } from "src/components/Inputs/TextInput/TextInputSmall";
import { SelectInput } from "src/components/Inputs";
import { Metrics, colorTagsClasses } from "src/utilities/constants";
import { setQueryParams } from "src/utilities/navigation";
import { Popover } from "src/components/Dialogs";
import { useForm } from "react-hook-form";
import { RequestLogTable } from "src/components/Tables";
import { CopyButton, DotsButton, IconButton } from "src/components/Buttons";
import { WelcomeState } from "src/components/Sections";
import { SidePanel } from "./SidePanel";

const mapStateToProps = (state: RootState) => ({
  requestLogs: state.requestLogs.logs as LogItem[],
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
  const [showFilter, setShowFilter] = useState(false);
  // const [inputSets, setInputSets] = useState(1);
  const [inputSets, setInputSets] = useState([0]);
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const performance_param = new URLSearchParams(location.search).get("metric");
  const breakdown_type = new URLSearchParams(location.search).get("breakdown");
  const [open, setOpen] = useState(false);
  const handleTimePeriodSelection = (selectedValue) => {
    dispatch(setDisplayTimeRange(selectedValue, setQueryParams, navigate));
    getDashboardData();
  };

  const handleFilter = () => {
    return () => {
      setShowFilter((prev) => {
        // If we are hiding the filter (setting it to false), also reset inputSets
        if (prev) {
          setInputSets([0]); // Reset to initial state
        }
        return !prev;
      });
    };
  };
  const handleAddInputSet = () => {
    if (inputSets.length < 3) {
      // Find the next unique index
      const nextIndex = inputSets.length > 0 ? Math.max(...inputSets) + 1 : 0;
      setInputSets([...inputSets, nextIndex]);
    }
  };

  const handleCloseInputSet = (setIndex: any) => {
    setInputSets(inputSets.filter((index) => index !== setIndex));
  };
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
    // { name: "By token type", value: "by_token_type" }, //only for total tokens
  ];

  const currentMetric = useSelector(
    (state: RootState) => state.dashboard.displayFilter.metric
  );
  const currentTimeRange = useSelector(
    (state: RootState) => state.dashboard.displayFilter.timeRange
  );
  const currentType = useSelector(
    (state: RootState) => state.dashboard.displayFilter.type
  );
  const currentBreakdown = useSelector(
    (state: RootState) => state.dashboard.displayFilter.breakDown
  );

  let filteredtypeChoices: any[] = [];
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

  const filteredBreakdownChoices = breakdownChoices;

  if (firstTime) return <WelcomeState />;
  else
    return (
      <div className="flex-col items-start self-stretch h-[calc(100vh-54px)] rounded-xs bg-gray-1">
        <div
          aria-label=""
          className="flex-row py-xs px-lg justify-between items-center self-stretch rounded-xs shadow-border-b-2"
        >
          <div className="flex flex-row items-center gap-xxxs">
            {!showFilter && (
              <Button
                variant="small"
                icon={Filter}
                text="Filter"
                onClick={handleFilter()}
                // borderColor="shadow-border-dashed"
              />
            )}
            {showFilter && (
              <Button
                variant="small"
                icon={Close}
                text="Clear filters"
                onClick={handleFilter()}
                iconPosition="right"
              />
            )}
          </div>
          <div className="flex-row gap-xxxs rounded-xs items-center">
            <TextInputSmall
              icon={Search}
              onChange={(e) => setInputValue(e.target.value)}
            />
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
                  {performance_param !== Metrics.number_of_requests.value &&
                    performance_param !== Metrics.error_count.value &&
                    performance_param !== Metrics.average_latency.value && (
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
                          choices={filteredtypeChoices}
                        />
                      </div>
                    )}
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
          </div>
        </div>
        <div
          aria-label="filter-display"
          className="flex flex-row py-xs px-lg justify-between items-center self-stretch rounded-xs shadow-border-b-2"
        >
          <div className="flex flex-row items-center gap-xxs rounded-xs">
            {showFilter && (
              <React.Fragment>
                {inputSets.map((inputSetId) => (
                  <div
                    className="flex flex-row items-center gap-[2px]"
                    key={inputSetId}
                  >
                    <SelectInput
                      headLess
                      placeholder="Status"
                      align="end"
                      // value={currentTimeRange}
                      icon={Down}
                      padding="py-xxxs px-xxs"
                      gap="gap-xxs"
                      choices={[
                        { name: "Status", value: "status" },
                        // { name: "Week", value: "weekly" },
                        // { name: "Month", value: "monthly" },
                        // { name: "Year", value: "yearly" },
                      ]}
                      // handleSelected={handleTimePeriodSelection}
                    />
                    <SelectInput
                      headLess
                      placeholder="is"
                      align="end"
                      // value={currentTimeRange}
                      icon={Down}
                      padding="py-xxxs px-xxs"
                      gap="gap-xxs"
                      choices={[
                        { name: "is", value: "is" },
                        { name: "is not", value: "is_not" },
                        // { name: "Month", value: "monthly" },
                        // { name: "Year", value: "yearly" },
                      ]}
                      // handleSelected={handleTimePeriodSelection}
                    />
                    <SelectInput
                      headLess
                      placeholder="Error"
                      align="end"
                      // value={currentTimeRange}
                      icon={Down}
                      padding="py-xxxs px-xxs"
                      gap="gap-xxs"
                      choices={[
                        { name: "Error", value: "error" },
                        { name: "Success", value: "success" },
                        // { name: "Month", value: "monthly" },
                        // { name: "Year", value: "yearly" },
                      ]}
                      // handleSelected={handleTimePeriodSelection}
                    />
                    {
                      <DotsButton
                        icon={Close}
                        onClick={() => handleCloseInputSet(inputSetId)}
                      />
                    }
                  </div>
                ))}
                {inputSets.length < 3 && (
                  <DotsButton icon={Add} onClick={handleAddInputSet} />
                )}
              </React.Fragment>
            )}
          </div>
          <div className="flex flex-row items-center gap-xxs rounded-xs ">
            <div className="flex flex-row items-center gap-xxxs rounded-xs">
              <span className="text-sm-regular text-gray-4">123</span>
              <span className="text-sm-regular text-gray-4">/</span>
              <span className="text-sm-regular text-gray-4">500</span>
            </div>
            <Button variant="small" icon={Export} text="Export" />
            <DotsButton
              icon={open ? SideBarActive : SideBar}
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
        <div
          aria-label="table"
          className="flex-row flex-grow self-stretch items-start overflow-hidden"
        >
          <div className="flex-col flex-grow max-h-full items-start overflow-auto">
            <RequestLogTable />
            <div className="flex-row py-lg justify-center items-center w-full">
              <div className="flex-row gap-sm items-center">
                <span className="text-sm-md">165 entries hidden by filter</span>
                <Button variant="small" text="Clear filters" />
              </div>
            </div>
          </div>
          <div className="flex-col items-start h-full overflow-auto">
            <SidePanel logItem={requestLogs?.[0]} open={open} />
          </div>
        </div>
      </div>
    );
};

export const Requests = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestsNotConnected);
