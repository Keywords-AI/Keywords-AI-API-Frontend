import { ModelTag } from "src/components/Misc";
import React from "react";

export function ModelTags(models: string[]) {
  return (
    <div className="flex-row gap-xxxs flex-wrap pr-xxs">
      {models.map((model) => (
        <ModelTag key={model} model={model} />
      ))}
    </div>
  );
}
