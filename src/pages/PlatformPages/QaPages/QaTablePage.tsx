import React, { useEffect, useState } from "react";
import { PageContent } from "src/components/Sections";
import { SettingTable } from "src/components/Tables";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { RootState, DisplayLogItem } from "src/types";
import { getRequestLogs, processRequestLogs } from "src/store/actions";
import { Tag } from "src/components/Misc";
import { models } from "src/utilities/constants";

const dummyLogItem: DisplayLogItem = {
  time: "",
  prompt: "",
  response: "",
  cost: "",
  latency: "",
  tokens: 0,
  tagGroup: React.createElement(Tag, {text: "dummy"}),
};

export function QaTablePage() {
  const dispatch = useTypedDispatch();
  const requestLogs = useTypedSelector(
    (state: RootState) => state.requestLogs.logs
  );
  const modelTag = (model: string) => {
    const modelInfo = models.find((m) => m.value === model);
    if (modelInfo) {
      return <Tag text={model} icon={React.createElement(modelInfo.icon)} />;
    }
    return <Tag text={"unknown"} />;
  };
  const statusTag = (status: string) => {
    return <Tag text={status} />;
  };
  const [displayedLogs, setDisplayedLogs] = useState<DisplayLogItem[]>([]);
  useEffect(()=> {
    dispatch(getRequestLogs());
  });
  const tagGroup = ({key, model, status} : {key: string, model: string, status: string}) => {
    return (
      <div className="flex-row gap-xxs">
        <span>{key}</span>
        <div className="flex-row gap-xxxs">
          {modelTag(model)}
          {statusTag(status)}
        </div>
      </div>
    );
  };
  useEffect(() => {
    setDisplayedLogs(processRequestLogs(requestLogs, tagGroup));
  }, [requestLogs]);
  return (
    <PageContent title="QA Table" subtitle="Tables">
      <SettingTable
        headers={[
          "Time",
          "Prompt",
          "Response",
          "Cost",
          "Latency",
          "Tokens",
          "",
        ]}
        headerLayout={"grid-cols-[120px_120px_120px_80px_80px_80px_1fr]"}
        rows={displayedLogs}
        rowLayout={"grid-cols-[120px_120px_120px_80px_80px_80px_1fr]"}
        columnNames={Object.keys(dummyLogItem)}
      />

    </PageContent>
  );
}
