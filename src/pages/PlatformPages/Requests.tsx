import React, { FunctionComponent, useEffect, useState } from "react";
import {
  connect,
  ConnectedComponent,
  DispatchProp,
  useDispatch,
  useSelector,
} from "react-redux";
import { RootState } from "src/types";
import { SettingTable } from "src/components/Tables";
import {
  getDashboardData,
  setDateData,
  setDisplayBreakdown,
  setDisplayMetric,
  setDisplayTimeRange,
  setDisplayType,
} from "src/store/actions";
import { getRequestLogs } from "src/store/actions";
import { LogItem } from "src/types";
import { useLocation, useNavigate } from "react-router-dom";
import { TitleAuth } from "src/components/Titles";
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
import { TextInputSmall } from "src/components/Inputs/TextInput/TextInputSmall";
import { SelectInput } from "src/components/Inputs";
import { Metrics, colorTagsClasses } from "src/utilities/constants";
import { setQueryParams } from "src/utilities/navigation";
import { Popover } from "src/components/Dialogs";
import { useForm } from "react-hook-form";
import { CopyButton, DotsButton } from "src/components/Buttons";

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
  const [showFilter, setShowFilter] = useState(false);
  // const [inputSets, setInputSets] = useState(1);
  const [inputSets, setInputSets] = useState([0]);
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const performance_param = new URLSearchParams(location.search).get("metric");
  const breakdown_type = new URLSearchParams(location.search).get("breakdown");

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

  // const handleAddInputSet = () => {
  //   if (inputSets < 3) {
  //     setInputSets(inputSets + 1);
  //   }
  // };
  const handleAddInputSet = () => {
    if (inputSets.length < 3) {
      // Find the next unique index
      const nextIndex = inputSets.length > 0 ? Math.max(...inputSets) + 1 : 0;
      setInputSets([...inputSets, nextIndex]);
    }
  };
  // const handleCloseInputSet = (setIndex) => {
  //   // Create a new array without the set that needs to be closed
  //   const updatedInputSets = Array.from({ length: inputSets })
  //     .map((_, index) => index)
  //     .filter(index => index !== setIndex)
  //     .length;

  //   setInputSets(updatedInputSets);
  // };

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
  const SidePanel = ({ logItem: LogItem }) => {
    const {
      timestamp,
      cost,
      latency,
      status,
      completion_tokens,
      prompt_tokens,
      model,
      id,
      completion_message,
      prompt_messages,
      error_message,
      organization_key,
      failed,
      category,
    } = LogItem;

    const sampleMessages = [
      {
        role: "user",
        content: "This is a prompt message",
      },
      {
        role: "ai",
        content: "This is a response message",
      },
    ];
    const displayObj = {
      "Created at": (
        <span className="text-sm-regular text-gray-4">
          {new Date(timestamp || "Aug 25, 8:03 PM").toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      ),
      Status: status || "Success",
      "API key": (
        <span className="text-sm-regular text-gray-4">
          {organization_key || "production"}
        </span>
      ),
      Model: (
        <span className="text-sm-regular text-gray-4">{model || "gpt-4"}</span>
      ),
      "Prompt tokens": (
        <span className="text-sm-regular text-gray-4">
          {prompt_tokens || "2312"}
        </span>
      ),
      "Completion tokens": (
        <span className="text-sm-regular text-gray-4">
          {completion_tokens || "4220"}
        </span>
      ),
      "Total tokens": (
        <span className="text-sm-regular text-gray-4">
          {prompt_tokens + completion_tokens || "6532"}
        </span>
      ),
      Cost: (
        <span className="text-sm-regular text-gray-4">
          {"$" + cost || "0.2134"}
        </span>
      ),
      Latency: (
        <span className="text-sm-regular text-gray-4">
          {latency || "3.360" + "s"}
        </span>
      ),
    };
    return (
      <div className="flex-col w-[400px] items-start self-stretch shadow-border-l shadow-gray-2 bg-gray-1">
        <div className="flex px-lg py-xxs justify-between items-center self-stretch shadow-border-b shadow-gray-2">
          <p className="text-sm-md text-gray-4">Log</p>
          <CopyButton text={JSON.stringify(LogItem)} />
        </div>
        <div className="flex-col py-md px-lg items-start gap-xs self-stretch">
          {Object.keys(displayObj).map((key, index) => {
            return (
              <div
                className="flex h-[24px] justify-between items-center self-stretch"
                key={index}
              >
                <span className="text-sm-md text-gray-5">{key}</span>
                {displayObj[key]}
              </div>
            );
          })}
        </div>
        <Divider />
        <div className="flex-col items-start gap-xs self-stretch py-sm px-lg pb-[24px]">
          {prompt_messages ||
            sampleMessages.map((message, index) => (
              <div
                key={index}
                className="flex-col items-start gap-xxs self-stretch"
              >
                <div className="flex justify-between items-center self-stretch">
                  <p className="text-sm-md text-gray-5">
                    {message.role === "user" ? "Prompt" : "Response"}
                  </p>
                  <CopyButton text={message.content} />
                </div>
                <div className="flex py-xxxs px-xxs items-start gap-[10px] self-stretch rounded-sm bg-gray-2 text-gray-4 text-sm-regular">
                  {message.content}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  if (firstTime) return <WelcomeState />;
  else
    return (
      <div className="flex flex-col items-start self-stretch flex-grow rounded-xs bg-gray-1">
        <div className="flex flex-row py-xs px-lg justify-between items-center self-stretch rounded-xs shadow-border-b-2">
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
          <div className="flex flex-row gap-xxxs rounded-xs">
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
        <div className="flex flex-row py-xs px-lg justify-between items-center self-stretch rounded-xs shadow-border-b-2">
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
