import { Button, DotsButton } from "src/components/Buttons";
import { Left, Right, Down, First, Last } from "src/components/Icons";
import { SelectInput } from "src/components/Inputs";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { RootState } from "src/types";
import { get, set, useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { setQueryParams } from "src/utilities/navigation";
import { useEffect } from "react";
import { getUsersLogData } from "src/store/actions/usersPageAction";

export const Paginator = () => {
  const dispatch = useTypedDispatch();
  const { count, previous, next } = useTypedSelector(
    (state: RootState) => state.usersPage
  );
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { register, watch } = useForm();
  const { page_size } = watch();
  const currentPage = parseInt(params.get("page") || "1");
  const pageSize = parseInt(page_size) || 25;
  const startRowNumber = (currentPage - 1) * pageSize + 1;
  const endRowNumber =
    currentPage * page_size > count ? count : currentPage * pageSize;
  useEffect(() => {
    if (page_size) {
      setQueryParams({ page_size }, navigate);
      dispatch(getUsersLogData());
    }
  }, [page_size]);
  const hanleNextPage = () => {
    if (next) {
      const params = new URLSearchParams(next.split("?")[1]);
      setQueryParams({ page: params.get("page") ?? "1" }, navigate);
      dispatch(getUsersLogData());
    }
  };
  const handleFistPage = () => {
    setQueryParams({ page: "1" }, navigate);
    dispatch(getUsersLogData());
  };
  const handleLastPage = () => {
    const lastPageNumber = Math.ceil(count / pageSize);
    console.log(lastPageNumber);
    setQueryParams({ page: lastPageNumber }, navigate);
    dispatch(getUsersLogData());
  };
  const hanlePreviousPage = () => {
    if (previous) {
      const params = new URLSearchParams(previous.split("?")[1]);
      setQueryParams({ page: params.get("page") ?? "1" }, navigate);
      dispatch(getUsersLogData());
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
          textColor="text-gray-5"
          icon={Down}
          defaultValue={"100"}
          {...register("page_size")}
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
            disabled={previous ? false : true}
            iconFill={previous ? undefined : "fill-gray-2"}
          />
          <DotsButton
            icon={Left}
            onClick={hanlePreviousPage}
            disabled={previous ? false : true}
            iconFill={previous ? undefined : "fill-gray-2"}
          />
          <DotsButton
            icon={Right}
            onClick={hanleNextPage}
            disabled={next ? false : true}
            iconFill={next ? undefined : "fill-gray-2"}
          />
          <DotsButton
            icon={Last}
            onClick={handleLastPage}
            disabled={next ? false : true}
            iconFill={next ? undefined : "fill-gray-2"}
          />
        </div>
      </div>
    </div>
  );
};
