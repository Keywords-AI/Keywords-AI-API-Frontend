export const ChartContainer = ({
  title = "Title",
  summary = 800,
  children,
  rightContent = null,
}) => {
  return (
    <div className="flex-col items-start gap-xs  h-full w-full ">
      <div className="flex items-center justify-between self-stretch">
        <div className="flex-col items-start gap-xxxs">
          <p className="text-sm-md text-gray-4">{title}</p>
          <div className="flex items-center gap-xxs">
            <p className="display-sm text-gray-5">{summary}</p>
          </div>
        </div>
        {rightContent}
      </div>
      {children}
    </div>
  );
};
