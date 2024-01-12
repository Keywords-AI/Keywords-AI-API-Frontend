import React, { useEffect } from "react";
import { connect, DispatchProp  } from "react-redux";
import { RootState } from "src/store/store";
import { SettingTable } from "src/components/Tables";
import { getDashboardData } from "src/store/actions";
import { getUsageData } from "src/store/actions";

interface DataByDateItem {
  date_group: string;
  total_cost: number;
  total_tokens: number;
  average_latency: number;
  number_of_requests: number;
}

const mapStateToProps = (state: RootState) => ({
  logs: state.dashboard.data as DataByDateItem[],
});

const mapDispatchToProps = {
  getDashboardData,
};

type UsageLogsProps = ReturnType<typeof mapStateToProps> &
typeof mapDispatchToProps;

export const UsageLogsNotConnected: React.FC<UsageLogsProps> = ({
  logs,
  getDashboardData,
}) => {
  useEffect(() => {
    getDashboardData("summary_type=monthly");
  }, []);
  return (
    <div className="flex-col flex-grow self-stretch">
      <SettingTable
        headers={[
          "Time",
          "Prompt tokens",
          "Completion tokens",
          "Latency", 
          "Prompt message",
          "Response message",
          "Cost"
        ]}
        headerLayout={"grid-cols-8"}
        rows={logs}
        rowLayout={"grid-cols-8"}
        columnNames={['date_group', 'total_prompt_tokens', 'tota_completion_tokens','prompt_message','response_message', 'average_latency','total_cost',]}
      />
    </div>
  );
};

export const UsageLogs = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsageLogsNotConnected);
