import React, { FunctionComponent, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "src/types";
import {
  getDashboardData,
  setSidePanelOpen,
  setSelectedRequest,
  updateUser,
} from "src/store/actions";
import { getRequestLogs } from "src/store/actions";
import { LogItem } from "src/types";
import { Add, Button, Close, Down, Export, Filter } from "src/components";
import { SideBar, SideBarActive } from "src/components/Icons";
import { SelectInput } from "src/components/Inputs";
import { RequestLogTable } from "src/components/Tables";
import { CopyButton, DotsButton, IconButton } from "src/components/Buttons";
import { WelcomeState } from "src/components/Sections";
import { SidePanel } from "./SidePanel";
import FilterControl from "./FilterControl";
import { FilterActions } from "./FilterActions";
import { setQueryParams } from "src/utilities/navigation";
import { useNavigate, useLocation } from "react-router-dom";
import { get, set, useForm } from "react-hook-form";

const mapStateToProps = (state: RootState) => ({
  requestLogs: state.requestLogs.logs as LogItem[],
  firstTime: !state.organization?.has_api_call,
  sidePanelOpen: state.requestLogs.sidePanelOpen,
  selectedRequest: state.requestLogs.selectedRequest,
});

const mapDispatchToProps = {
  getDashboardData,
  getRequestLogs,
  setSidePanelOpen,
  setSelectedRequest,
};

interface Actions {
  getDashboardData: (overrideParams?: any) => void;
  getRequestLogs: () => void;
  setSidePanelOpen: (open: boolean) => void;
  setSelectedRequest: (id: number) => void;
}

type UsageLogsProps = ReturnType<typeof mapStateToProps> & Actions;

export const RequestsNotConnected: FunctionComponent<UsageLogsProps> = ({
  requestLogs,
  getRequestLogs,
  firstTime,
  sidePanelOpen,
  setSidePanelOpen,
  selectedRequest,
  setSelectedRequest,
}) => {
  useEffect(() => {
    getRequestLogs();
  }, []);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("");
  // const [inputSets, setInputSets] = useState(1);
  const [inputSets, setInputSets] = useState([0]);
  const navigate = useNavigate();
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
    // Find the next unique index
    const nextIndex = inputSets.length > 0 ? Math.max(...inputSets) + 1 : 0;
    setInputSets([...inputSets, nextIndex]);
  };

  const handleCloseInputSet = (setIndex: any) => {
    setInputSets(inputSets.filter((index) => index !== setIndex));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [editing, setEditing] = useState(false);
  const onSubmit = (data: any) => {
    const value = data.value === "true";
    const negation = data.operator === "!";
    const failed = negation ? !value : value;
    setQueryParams({ failed }, navigate);
    getRequestLogs();
    setEditing(false);
  };
  useEffect(() => {}, [params]);
  const handleSlectedFilter = (value: string) => {
    setFilter(value);
    setShowFilter((prev) => {
      // If we are hiding the filter (setting it to false), also reset inputSets
      if (prev) {
        setInputSets([0]); // Reset to initial state
      }
      return !prev;
    });

  };
  if (firstTime) return <WelcomeState />;
  else
    return (
      <div className="flex-col items-start w-full h-[calc(100vh-54px)] rounded-xs bg-gray-1">
        <div
          aria-label=""
          className="flex-row py-xs px-lg justify-between items-center self-stretch rounded-xs shadow-border-b-2"
        >
          <div className="flex flex-row items-center gap-xxxs">
            {/* {!showFilter && (
              // 
              <FilterActions />
            )} */}
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
          <FilterControl />
        </div>
        <div
          aria-label="filter-display"
          className="flex flex-row py-xs px-lg justify-between items-center self-stretch rounded-xs shadow-border-b-2"
        >
          <div className="flex flex-row items-center gap-xxs rounded-xs">
            <React.Fragment>
              {params.get("failed") && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-row items-center gap-[2px]"
                >
                  {/* <SelectInput
                    headLess
                    defaultValue={"failed"}
                    {...register("metric")}
                    align="end"
                    // value={currentTimeRange}
                    icon={Down}
                    padding="py-xxxs px-xxs"
                    gap="gap-xxs"
                    choices={[{ name: "Status", value: "failed" }]}
                    // handleSelected={handleTimePeriodSelection}
                    onChange={() => setEditing(true)}
                  />
                  <SelectInput
                    headLess
                    placeholder="is"
                    align="end"
                    {...register("operator")}
                    // value={currentTimeRange}
                    icon={Down}
                    padding="py-xxxs px-xxs"
                    gap="gap-xxs"
                    choices={[
                      { name: "is", value: "" },
                      { name: "is not", value: "!" },
                    ]}
                    onChange={() => setEditing(true)}
                  />
                  <SelectInput
                    headLess
                    placeholder="Error"
                    align="end"
                    {...register("value")}
                    defaultValue="false"
                    // value={currentTimeRange}
                    icon={Down}
                    padding="py-xxxs px-xxs"
                    gap="gap-xxs"
                    choices={[
                      { name: "Error", value: "true" }, // Yep, "truly" failed
                      { name: "Success", value: "false" },
                    ]}
                    onChange={() => setEditing(true)}
                  />
                  {
                    <DotsButton
                      icon={Close}
                      onClick={() => handleCloseInputSet(inputSetId)}
                    />
                  }
                  {editing && <Button variant="small" text={"Apply"} />} */}
                  {/* <Filter metric={filter} /> */}
                </form>
              )}
              {inputSets.length < 3 && (
                <DotsButton icon={Add} onClick={handleAddInputSet} />
              )}
            </React.Fragment>
            <span className={"caption text-gray-4"}>
              Many more filtering options coming soon! - Raymond 1/23
            </span>
          </div>
          <div className="flex flex-row items-center gap-xxs rounded-xs ">
            <div className="flex flex-row items-center gap-xxxs rounded-xs">
              <span className="text-sm-regular text-gray-4">
                {requestLogs.length}
              </span>
              <span className="text-sm-regular text-gray-4">/</span>
              <span className="text-sm-regular text-gray-4">
                {requestLogs.length}
              </span>
            </div>
            <div className="w-[1px] h-[28px] shadow-border shadow-gray-2 "></div>
            {/* <Button variant="small" icon={Export} text="Export" />
            <div className="w-[1px] h-[28px] shadow-border shadow-gray-2 "></div> */}
            <DotsButton
              icon={sidePanelOpen ? SideBarActive : SideBar}
              onClick={() => {
                if (!selectedRequest) {
                  setSelectedRequest(requestLogs?.[0]?.id);
                }
                if (sidePanelOpen) {
                  setSelectedRequest(-1);
                }
                setSidePanelOpen(!sidePanelOpen);
              }}
            />
          </div>
        </div>
        <div
          aria-label="table"
          className="flex-row flex-grow self-stretch items-start overflow-hidden"
        >
          <div className="flex-col flex-grow max-h-full items-start overflow-auto">
            <RequestLogTable />
            {showFilter && (
              <div className="flex-row py-lg justify-center items-center w-full">
                <div className="flex-row gap-sm items-center">
                  <span className="text-sm-md">
                    {requestLogs.length - requestLogs.length} entries hidden by
                    filter
                  </span>
                  <Button variant="small" text="Clear filters" />
                </div>
              </div>
            )}
          </div>
          <SidePanel logItem={requestLogs?.[0]} open={sidePanelOpen} />
        </div>
      </div>
    );
};

export const Requests = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestsNotConnected);
