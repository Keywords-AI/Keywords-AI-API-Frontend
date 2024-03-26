import cn from "src/utilities/classMerge";

export const ChartContainer = ({
  title = "Title",
  summary = "800",
  children,
  rightContent,
  postUnits = false,
  small = false,
}) => {
  return (
    <div className={cn("flex-col items-start gap-xs  h-full w-full")}>
      <div className={cn("flex items-center justify-between self-stretch")}>
        <div
          className={cn(
            "flex-col items-start",
            small ? "gap-[2px]" : " gap-xxxs"
          )}
        >
          <p
            className={cn(
              "text-sm-md text-gray-4",
              small && "text-[7px] leading-[10px]"
            )}
          >
            {title}
          </p>
          <div className="flex items-center gap-xxs">
            <p
              className={cn(
                "display-sm text-gray-5 flex flex-row gap-xxsx",
                small && "text-[13px] leading-[16px]"
              )}
            >
              {summary}
              {postUnits && <p className="text-md-medium text-gray-4 pt-xxs">
                s
                </p>}
            </p>
          </div>
        </div>
        {rightContent}
      </div>
      {children}
    </div>
  );
};
