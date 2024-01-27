import { Button, DotsButton } from "src/components/Buttons";
import { Left, Right, Down } from "src/components/Icons";
import { SelectInput } from "src/components/Inputs";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { RootState } from "src/types";
import { get, set, useForm } from "react-hook-form";
import { getRequestLogs } from "src/store/actions";
import { useNavigate, useLocation } from "react-router-dom";
import { setQueryParams } from "src/utilities/navigation";
import { useEffect } from "react";

export const Paginator = () => {
  const dispatch = useTypedDispatch();
  const { count, lastPageUrl, nextPageUrl } = useTypedSelector(
    (state: RootState) => state.requestLogs
  );
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { register, watch } = useForm();
  const { page_size } = watch();
  const currentPage = parseInt(params.get("page") || "1");
  const pageSize = parseInt(page_size) || 100;
  const startRowNumber = (currentPage - 1) * pageSize + 1;
  const endRowNumber =
    currentPage * page_size > count ? count : currentPage * pageSize;
  useEffect(() => {
    if (page_size) {
      setQueryParams({ page_size }, navigate);
      dispatch(getRequestLogs());
    }
  }, [page_size]);
  const hanleNextPage = () => {
    if (nextPageUrl) {
      const params = new URLSearchParams(nextPageUrl.split("?")[1]);
      setQueryParams({ page: params.get("page") ?? "1" }, navigate);
      dispatch(getRequestLogs());
    }
  };
  const hanlePreviousPage = () => {
    if (lastPageUrl) {
      const params = new URLSearchParams(lastPageUrl.split("?")[1]);
      setQueryParams({ page: params.get("page") ?? "1" }, navigate);
      dispatch(getRequestLogs());
    }
  };
  return (
    <div className="flex-row gap-sm items-center">
      <div className="flex-row gap-xxs items-center">
        <span className="text-sm-md text-gray-4">Rows per page</span>
        <SelectInput
          headLess
          padding="px-xxs py-xxxs"
          gap="gap-xxs"
          icon={Down}
          defaultValue={"100"}
          {...register("page_size")}
          choices={[
            { name: "25", value: "25" },
            { name: "50", value: "50" },
            { name: "100", value: "100" },
            { name: "250", value: "250" },
            { name: "500", value: "500" },
          ]}
        />
      </div>
      <div className="flex-row gap-xxs items-center">
        <span className="text-sm-md text-gray-4">
          {startRowNumber} - {endRowNumber} {count > 1 ? "row" : "rows"}
        </span>
        <div className="flex-row">
          <DotsButton icon={Left} onClick={hanleNextPage} />
          <DotsButton icon={Right} onClick={hanlePreviousPage} />
        </div>
      </div>
    </div>
  );
};
