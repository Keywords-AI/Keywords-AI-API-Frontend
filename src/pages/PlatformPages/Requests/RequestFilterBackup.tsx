// changeField: ({ register, value, choices }) => (
//     <SelectInput
//       headLess
//       // placeholder="Error"
//       align="end"
//       {...register("value")}
//       defaultValue={value}
//       // value={currentTimeRange}
//       icon={Down}
//       padding="py-xxxs px-xxs"
//       gap="gap-xxs"
//       choices={choices}
//     />
//   ), // <AnyInputElement {...params} />
// },

// apiKey: {
//   metricSelection: (register) => (
//     <SelectInput
//       headLess
//       defaultValue={"apiKey"}
//       {...register("metric")}
//       align="end"
//       // value={currentTimeRange}
//       icon={Down}
//       padding="py-xxxs px-xxs"
//       gap="gap-xxs"
//       choices={[{ name: "API Key", value: "apiKey" }]}
//       // handleSelected={handleTimePeriodSelection}
//     />
//   ),
//   operationSelection: (register) => (
//     <SelectInput
//       headLess
//       placeholder="is"
//       align="end"
//       {...register("operator")}
//       // value={currentTimeRange}
//       icon={Down}
//       padding="py-xxxs px-xxs"
//       gap="gap-xxs"
//       choices={[
//         { name: "is", value: "" },
//         { name: "is not", value: "!" },
//       ]}
//     />
//   ),
//   changeField: ({ register, value, choices }) => {
//     return (
//       <SelectInput
//         headLess
//         // placeholder="Error"
//         align="end"
//         {...register("value")}
//         defaultValue={value}
//         // value={currentTimeRange}
//         icon={Down}
//         padding="py-xxxs px-xxs"
//         gap="gap-xxs"
//         choices={choices?.map((choice) => ({ name: choice, value: choice }))}
//       />
//     );
//   },
// },

// model: {
//   metricSelection: (register) => (
//     <SelectInput
//       headLess
//       defaultValue={"model"}
//       {...register("metric")}
//       align="end"
//       // value={currentTimeRange}
//       icon={Down}
//       padding="py-xxxs px-xxs"
//       gap="gap-xxs"
//       choices={[{ name: "Model", value: "model" }]}
//       // handleSelected={handleTimePeriodSelection}
//     />
//   ),
//   operationSelection: (register) => (
//     <SelectInput
//       headLess
//       placeholder="is"
//       align="end"
//       {...register("operator")}
//       // value={currentTimeRange}
//       icon={Down}
//       padding="py-xxxs px-xxs"
//       gap="gap-xxs"
//       choices={[
//         { name: "is", value: "" },
//         { name: "is not", value: "!" },
//       ]}
//     />
//   ),
//   changeField: ({ register, value, choices }) => {
//     return (
//       <SelectInput
//         headLess
//         // placeholder="Error"
//         align="end"
//         {...register("value")}
//         defaultValue={value}
//         // value={currentTimeRange}
//         icon={Down}
//         padding="py-xxxs px-xxs"
//         gap="gap-xxs"
//         choices={choices?.map((choice) => ({ name: choice, value: choice }))}
//       />
//     );
//   },
// },
// prompt: {
//   metricSelection: (register) => (
//     <SelectInput
//       headLess
//       defaultValue={"prompt"}
//       {...register("metric")}
//       align="end"
//       // value={currentTimeRange}
//       icon={Down}
//       padding="py-xxxs px-xxs"
//       gap="gap-xxs"
//       choices={[{ name: "Prompt", value: "prompt" }]}
//       // handleSelected={handleTimePeriodSelection}
//     />
//   ),
//   operationSelection: (register) => (
//     <SelectInput
//       headLess
//       placeholder="contains"
//       align="end"
//       {...register("operator")}
//       // value={currentTimeRange}
//       icon={Down}
//       padding="py-xxxs px-xxs"
//       gap="gap-xxs"
//       choices={[
//         { name: "contains", value: "" },
//         { name: "does not contains", value: "!" },
//       ]}
//     />
//   ),
//   changeField: ({ register, value, choices, onChange }) => {
//     return (
//       <TextInputSmall
//         placeholder="Search prompt..."
//         {...register("prompt", {
//           value: value,
//           onChange: (e) => {},
//         })}
//       />
//     );
//   },
// },

// {filterType === "failed" && (
//     <>
//       <Button
//         variant="panel"
//         text="success"
//         onClick={(e) => handleSecondClick(false)}
//       />
//       <Button
//         variant="panel"
//         text="error"
//         onClick={(e) => handleSecondClick(true)}
//       />
//     </>
//   )}

//   {filterType === "apiKey" &&
//     keys.map((key, index) => (
//       <Button
//         variant="panel"
//         text={key}
//         onClick={(e) => handleSecondClick(key)}
//       />
//     ))}
//   {filterType === "model" &&
//     models.map((model, index) => (
//       <Button
//         variant="panel"
//         text={model}
//         onClick={(e) => handleSecondClick(model)}
//       />
//     ))}