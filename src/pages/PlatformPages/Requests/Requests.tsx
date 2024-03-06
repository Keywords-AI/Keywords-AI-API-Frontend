import React, { FunctionComponent, useEffect, useRef, useState } from "react";
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
import { getRequestLogs, exportLogs } from "src/store/actions";
import { LogItem } from "src/types";
import { Add, Button, Close, Down, Export, Filter } from "src/components";
import { AlphanumericKey, SideBar, SideBarActive } from "src/components/Icons";
import { SelectInput, SelectInputSmall } from "src/components/Inputs";
import { RequestLogTable } from "src/components/Tables";
import { CopyButton, DotsButton, IconButton } from "src/components/Buttons";
import { WelcomeState } from "src/components/Sections";
import { SidePanel } from "./Sidepanel/SidePanel";
import FilterControl from "./FilterControl";
import { FilterActions } from "./FilterActions";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { get, set, useForm } from "react-hook-form";
import { Filters } from "./RequestFilters";
import { Paginator } from "./Paginator";
import { Popover } from "src/components/Dialogs";
import { useTypedDispatch } from "src/store/store";
import { getQueryParam } from "src/utilities/navigation";
import Tooltip from "src/components/Misc/Tooltip";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
const mapStateToProps = (state: RootState) => ({
  requestLogs: state.requestLogs.logs as LogItem[],
  firstTime: !state.organization?.has_api_call,
  sidePanelOpen: state.requestLogs.sidePanelOpen,
  selectedRequest: state.requestLogs.selectedRequest,
  filters: state.requestLogs.filters,
  count: state.requestLogs.count,
  totalCount: state.requestLogs.totalCount,
  loading: state.requestLogs.loading,
});

const mapDispatchToProps = {
  getDashboardData,
  getRequestLogs,
  setSidePanelOpen,
  setSelectedRequest,
  setFilterOpen,
  setFilters,
  exportLogs,
};

interface Actions {
  getDashboardData: (overrideParams?: any) => void;
  getRequestLogs: () => void;
  setSidePanelOpen: (open: boolean) => void;
  setSelectedRequest: (id: number) => void;
  setFilterOpen: (open: boolean) => void;
  setFilters: (filters: any) => void;
  exportLogs: () => void;
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
  exportLogs,
  filters,
  count,
  totalCount,
  loading,
}) => {
  const { enableScope, disableScope } = useHotkeysContext();
  useEffect(() => {
    getRequestLogs();
    if (!selectedRequest) {
      setSelectedRequest(requestLogs?.[0]?.id);
    }
  }, []);
  const tableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTop = 0;
    }
  }, [getQueryParam("page")]);
  const clearFilters = () => {
    setFilters([]);
  };
  useEffect(() => {
    if (filters.length > 0) enableScope("clear_filters");
    else disableScope("clear_filters");
    return () => {
      disableScope("clear_filters");
    };
  }, [filters]);
  useHotkeys(
    "C",
    () => {
      if (loading) return;
      clearFilters();
    },
    {
      scopes: "clear_filters",
    }
  );
  useHotkeys(
    ".",
    () => {
      if (loading) return;
      setSidePanelOpen(!sidePanelOpen);
    },
    {}
  );
  if (firstTime) return <WelcomeState />;
  else
    return (
      <div className="flex-col items-start w-full h-[calc(100vh-54px)] rounded-xs bg-gray-1">
        <div
          aria-label=""
          className="flex-row py-xs px-lg justify-between items-center self-stretch rounded-xs shadow-border-b-2 h-[52px]"
        >
          <div className="flex flex-row items-center gap-xxxs">
            {filters.length > 0 === false && <FilterActions type="filter" />}

            {filters.length > 0 && (
              <React.Fragment>
                <Tooltip
                  side="bottom"
                  sideOffset={8}
                  align="start"
                  delayDuration={1}
                  content={
                    <>
                      <p className="caption text-gray-4">Clear filters</p>
                      <AlphanumericKey value={"C"} />
                    </>
                  }
                >
                  <Button
                    variant="small-dashed"
                    icon={Close}
                    text="Clear filters"
                    onClick={clearFilters}
                    iconPosition="right"
                  />
                </Tooltip>
              </React.Fragment>
            )}
          </div>

          <FilterControl />
        </div>
        <div
          aria-label="filter-display"
          className="flex flex-row py-xs px-lg justify-between items-center self-stretch rounded-xs shadow-border-b-2 h-[52px]"
        >
          <div className="flex flex-row items-center gap-xxs rounded-xs">
            {
              <React.Fragment>
                <Filters />
                {filters.length > 0 && <FilterActions type="add" />}
              </React.Fragment>
            }
          </div>
          <div className="flex flex-row items-center gap-xxs rounded-xs ">
            <div className="flex flex-row items-center gap-xxxs rounded-xs text-sm-regular text-gray-4">
              {count} / {totalCount}
            </div>
            <ExportPopOver />

            <div className="w-[1px] h-[28px] shadow-border shadow-gray-2 "></div>
            <Tooltip
              side="bottom"
              sideOffset={8}
              align="end"
              delayDuration={1}
              content={
                <>
                  <p className="caption text-gray-4">Open right sidebar</p>
                  <AlphanumericKey value={"."} />
                </>
              }
            >
              <div>
                <DotsButton
                  icon={sidePanelOpen ? SideBarActive : SideBar}
                  active={sidePanelOpen}
                  onClick={() => {
                    if (totalCount === 0) return;
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
            </Tooltip>
          </div>
        </div>
        <div
          aria-label="table"
          className="flex-row flex-grow self-stretch items-start overflow-hidden"
        >
          <div
            aria-label="scroll-control"
            ref={tableRef}
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
                    variant="small-dashed"
                    text="Clear filters"
                    onClick={clearFilters}
                    iconPosition="right"
                    icon={Close}
                  />
                </div>
              </div>
            )}
            <div className="relative left-lg">
              <Paginator />
            </div>
          </div>
          <SidePanel open={sidePanelOpen} />
        </div>
      </div>
    );
};

export const Requests = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestsNotConnected);

const ExportPopOver = () => {
  const dispatch = useTypedDispatch();
  const fileTypes = [
    { name: "CSV", value: ".csv" },
    { name: "JSON", value: ".json" },
  ];
  const [file, setFile] = useState(fileTypes[0].value);
  const { enableScope, disableScope } = useHotkeysContext();
  const [showDropdown, setShowDropdown] = useState(false);
  useHotkeys(
    "e",
    () => {
      setShowDropdown((prev) => !prev);
    },
    {
      scopes: "exportLogs",
    }
  );
  useEffect(() => {
    enableScope("exportLogs");
    return () => {
      disableScope("exportLogs");
    };
  }, []);

  return (
    <Popover
      width="w-[320px]"
      padding=""
      align="end"
      sideOffset={4}
      open={showDropdown}
      setOpen={setShowDropdown}
      trigger={
        <div>
          <Tooltip
            side="bottom"
            sideOffset={8}
            align="center"
            delayDuration={1}
            content={
              <>
                <p className="caption text-gray-4">Export logs</p>
                <AlphanumericKey value={"E"} />
              </>
            }
          >
            <Button
              variant="small"
              icon={Export}
              text="Export"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
          </Tooltip>
        </div>
      }
    >
      <div className="flex-col gap-sm py-sm px-md">
        <div className="flex-col items-start gap-xxs self-stretch">
          <p className="text-md-medium text-gray-5">Export logs</p>
          <p className="text-sm-regular text-gray-4">
            Download the copy of your log data in CSV or JSON format.
          </p>
        </div>
        <div className="flex justify-between items-center self-stretch">
          <p className="text-sm-regular text-gray-4">File type</p>
          <SelectInputSmall
            headLess
            trigger={() => (
              <Button
                variant="small"
                text={fileTypes.filter((item) => item.value === file)[0].name}
                iconPosition="right"
                icon={Down}
              />
            )}
            align="end"
            defaultValue={fileTypes[0].value}
            choices={fileTypes}
            onChange={(e) => setFile(e.target.value)}
          />
        </div>
        <div className="flex justify-end items-center gap-xs self-stretch">
          <Button
            variant="r4-primary"
            text={
              "Download " +
              fileTypes.filter((item) => item.value === file)[0].name
            }
            onClick={() => dispatch(exportLogs(file))}
            width="w-full"
          />
        </div>
      </div>
    </Popover>
  );
};
