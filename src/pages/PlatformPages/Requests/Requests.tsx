import React, { FunctionComponent, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "src/types";
import {
  getDashboardData,
  setSidePanelOpen,
  setSelectedRequest,
  updateUser,
  setFilterOpen,
  setFilters,
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
import { Filters } from "./RequestFilters";
import { Paginator } from "./Paginator";

const mapStateToProps = (state: RootState) => ({
  requestLogs: state.requestLogs.logs as LogItem[],
  firstTime: !state.organization?.has_api_call,
  sidePanelOpen: state.requestLogs.sidePanelOpen,
  selectedRequest: state.requestLogs.selectedRequest,
  firstFilter: state.requestLogs.firstFilter,
  secondFilter: state.requestLogs.secondFilter,
  filters: state.requestLogs.filters,
  count: state.requestLogs.count,
  totalCount: state.requestLogs.totalCount,
});

const mapDispatchToProps = {
  getDashboardData,
  getRequestLogs,
  setSidePanelOpen,
  setSelectedRequest,
  setFilterOpen,
  setFilters,
};

interface Actions {
  getDashboardData: (overrideParams?: any) => void;
  getRequestLogs: () => void;
  setSidePanelOpen: (open: boolean) => void;
  setSelectedRequest: (id: number) => void;
  setFilterOpen: (open: boolean) => void;
  setFilters: (filters: any) => void;
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
  setFilters,
  filters,
  count,
  totalCount,
}) => {
  useEffect(() => {
    getRequestLogs();
  }, []);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [showFilter, setShowFilter] = useState(false);
  const clearFilters = () => {
    setFilters([]);
  };
  useEffect(() => {}, [params]);
  if (firstTime) return <WelcomeState />;
  else
    return (
      <div className="flex-col items-start w-full h-[calc(100vh-54px)] rounded-xs bg-gray-1">
        <div
          aria-label=""
          className="flex-row py-xs px-lg justify-between items-center self-stretch rounded-xs shadow-border-b-2"
        >
          <div className="flex flex-row items-center gap-xxxs">
            {filters.length > 0 === false && <FilterActions type="filter" />}
            {filters.length > 0 && (
              <React.Fragment>
                <Button
                  variant="small"
                  icon={Close}
                  text="Clear filters"
                  onClick={clearFilters}
                  iconPosition="right"
                />
              </React.Fragment>
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
              <Filters />
              {filters.length > 0 && <FilterActions type="add" />}
            </React.Fragment>
            <span className={"caption text-gray-4"}>
              Many more filtering options coming soon! - Raymond 1/23
            </span>
          </div>
          <div className="flex flex-row items-center gap-xxs rounded-xs ">
            <div className="flex flex-row items-center gap-xxxs rounded-xs text-sm-regular text-gray-4">
              {count} / {totalCount}
            </div>
            <div className="w-[1px] h-[28px] shadow-border shadow-gray-2 "></div>
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
          <div
            aria-label="scroll-control"
            className="flex-col flex-grow max-h-full items-start overflow-auto gap-lg pb-lg"
          >
            <RequestLogTable />
            {filters.length > 0 && (
              <div className="flex-row py-lg justify-center items-center w-full">
                <div className="flex-row gap-sm items-center">
                  <span className="text-sm-md">
                    {totalCount - count} entries hidden by filter
                  </span>
                  <Button
                    variant="small"
                    text="Clear filters"
                    onClick={clearFilters}
                  />
                </div>
              </div>
            )}
            <div className="relative left-lg">
              <Paginator />
            </div>
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
