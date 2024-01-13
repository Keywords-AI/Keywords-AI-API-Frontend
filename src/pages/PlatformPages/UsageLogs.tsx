import React, { FunctionComponent, useEffect } from "react";
import { connect, ConnectedComponent, DispatchProp  } from "react-redux";
import { AppDispatch, RootState } from "src/store/store";
import { SettingTable } from "src/components/Tables";
import { getDashboardData } from "src/store/actions";
import { getRequestLogs } from "src/store/actions";
import { LogItem } from "src/types";

const mapStateToProps = (state: RootState) => ({
  requestLogs: state.requestLogs.data as LogItem[],
});

const mapDispatchToProps = {
  getDashboardData,
  getRequestLogs
};
interface Actions {
  getDashboardData: (overrideParams?: any) => void;
  getRequestLogs: () => void;
}
type UsageLogsProps = ReturnType<typeof mapStateToProps> &
Actions;

export const UsageLogsNotConnected:FunctionComponent<UsageLogsProps> = ({
  requestLogs,
  getDashboardData,
  getRequestLogs
})  => {
  useEffect(() => {
    getRequestLogs();
  }, []);
  return (
    <div className="flex-col flex-grow self-stretch">
      <SettingTable
        headers={[
          "Time",
          "Prompt tokens",
          "Completion tokens",
          "Latency",
          "Cost",
          "Status",
          // "Prompt messages",
          // "Completion messages",
          "Category",
        ]}
        headerLayout={"grid-cols-8"}
        rows={requestLogs}
        rowLayout={"grid-cols-8"}
        columnNames={['timestamp', 'prompt_tokens', 'completion_tokens', 'latency','cost', 'status', 
        // 'prompt_messages', 'completion_message', 
        'category']}
      />
    </div>
  );
};

export const UsageLogs = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsageLogsNotConnected);
