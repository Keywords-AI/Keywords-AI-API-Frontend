import React, { FunctionComponent, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "src/types";
import {
  getDashboardData,
  setDisplayBreakdown,
  setDisplayMetric,
  setDisplayTimeRange,
  setDisplayType,
  setSidePanelOpen,
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

const mapStateToProps = (state: RootState) => ({
  requestLogs: state.requestLogs.logs as LogItem[],
  firstTime: !state.organization?.has_api_call ?? false,
  sidePanelOpen: state.requestLogs.sidePanelOpen,
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
  getRequestLogs,
  firstTime,
  sidePanelOpen,
}) => {
  useEffect(() => {
    getRequestLogs();
  }, []);
  const [showFilter, setShowFilter] = useState(false);
  // const [inputSets, setInputSets] = useState(1);
  const [inputSets, setInputSets] = useState([0]);

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
          <FilterControl />
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
              <span className="text-sm-regular text-gray-4">{requestLogs.length}</span>
              <span className="text-sm-regular text-gray-4">/</span>
              <span className="text-sm-regular text-gray-4">{requestLogs.length}</span>
            </div>
            <div className="w-[1px] h-[28px] shadow-border shadow-gray-2 "></div>
            {/* <Button variant="small" icon={Export} text="Export" />
            <div className="w-[1px] h-[28px] shadow-border shadow-gray-2 "></div> */}
            <DotsButton
              icon={sidePanelOpen ? SideBarActive : SideBar}
              onClick={() => setSidePanelOpen(!sidePanelOpen)}
            />
          </div>
        </div>
        <div
          aria-label="table"
          className="flex-row flex-grow self-stretch items-start overflow-hidden"
        >
          <div className="flex-col flex-grow max-h-full items-start overflow-auto">
            <RequestLogTable />
            {showFilter && <div className="flex-row py-lg justify-center items-center w-full">
              <div className="flex-row gap-sm items-center">
                <span className="text-sm-md">{requestLogs.length - requestLogs.length} entries hidden by filter</span>
                <Button variant="small" text="Clear filters" />
              </div>
            </div>}
          </div>
          <div className="flex-col items-start h-full overflow-auto">
            <SidePanel logItem={requestLogs?.[0]} open={sidePanelOpen} />
          </div>
        </div>
      </div>
    );
};

export const Requests = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestsNotConnected);
