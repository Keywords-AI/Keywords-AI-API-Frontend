import { Button, DotsButton } from "src/components/Buttons";
import { Left, Right, Down, First, Last } from "src/components/Icons";
import { SelectInput } from "src/components/Inputs";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { RootState } from "src/types";
import { get, set, useForm } from "react-hook-form";
import { getRequestLogs } from "src/store/actions";
import { useNavigate, useLocation } from "react-router-dom";
import { setQueryParams } from "src/utilities/navigation";
import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { c } from "vite/dist/node/types.d-FdqQ54oU";

export const Paginator = () => {
  const dispatch = useTypedDispatch();
  const { count, lastPageUrl, nextPageUrl } = useTypedSelector(
    (state: RootState) => state.requestLogs
  );
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { register, watch } = useForm();
  // const { page_size } = watch();
  const currentPage = parseInt(params.get("page") || "1");
  const [page_size, setPageSize] = useState(100);
  const pageSize = page_size || 25;
  const startRowNumber = (currentPage - 1) * pageSize + 1;
  const endRowNumber =
    currentPage * page_size > count ? count : currentPage * pageSize;
  // useEffect(() => {
  //   if (page_size) {
  //     setQueryParams({ page_size }, navigate);
  //     dispatch(getRequestLogs());
  //   }
  // }, [page_size]);
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "page_size") {
        setPageSize(value[name]);
        setQueryParams({ page_size: value[name] }, navigate);
        dispatch(getRequestLogs());
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  const hanleNextPage = () => {
    if (nextPageUrl) {
      const params = new URLSearchParams(nextPageUrl.split("?")[1]);
      setQueryParams({ page: params.get("page") ?? "1" }, navigate);
      dispatch(getRequestLogs());
    }
  };
  const handleFistPage = () => {
    setQueryParams({ page: "1" }, navigate);
    dispatch(getRequestLogs());
  };
  const handleLastPage = () => {
    const lastPageNumber = Math.ceil(count / pageSize);
    console.log(lastPageNumber);
    setQueryParams({ page: lastPageNumber }, navigate);
    dispatch(getRequestLogs());
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
          // textColor="text-gray-5"
          icon={Down}
          defaultValue={"100"}
          {...register("page_size", { value: "100" })}
          choices={[
            { name: "25", value: "25" },
            { name: "50", value: "50" },
            { name: "100", value: "100" },
            { name: "250", value: "250" },
          ]}
        />
      </div>
      <div className="flex-row gap-xxs items-center">
        <span className="text-sm-regular text-gray-4">
          {startRowNumber} - {endRowNumber} {count > 1 ? "row" : "rows"}
        </span>
        <div className="flex-row">
          <DotsButton
            icon={First}
            onClick={handleFistPage}
            disabled={lastPageUrl ? false : true}
            iconFill={lastPageUrl ? undefined : "fill-gray-2"}
          />
          <DotsButton
            icon={Left}
            onClick={hanlePreviousPage}
            disabled={lastPageUrl ? false : true}
            iconFill={lastPageUrl ? undefined : "fill-gray-2"}
          />
          <DotsButton
            icon={Right}
            onClick={hanleNextPage}
            disabled={nextPageUrl ? false : true}
            iconFill={nextPageUrl ? undefined : "fill-gray-2"}
          />
          <DotsButton
            icon={Last}
            onClick={handleLastPage}
            disabled={nextPageUrl ? false : true}
            iconFill={nextPageUrl ? undefined : "fill-gray-2"}
          />
        </div>
      </div>
    </div>
  );
};
