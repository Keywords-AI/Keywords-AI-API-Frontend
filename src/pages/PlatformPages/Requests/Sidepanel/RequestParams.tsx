export const RequestParams = ({
  presence_penalty,
  frequency_penalty,
  temperature,
  max_tokens,
  top_p,
  stop_sequence,
}) => {
  return (
    <div className="flex-col  items-start gap-xs self-stretch">
      <div className="flex h-[24px] justify-between items-center self-stretch">
        <div className="flex items-center gap-xxs text-gray-5 text-sm-md ">
          Temperature
        </div>
        <div className=" text-gray-4 text-sm-regular">{temperature || "-"}</div>
      </div>

      <div className="flex h-[24px] justify-between items-center self-stretch">
        <div className="flex items-center gap-xxs text-gray-5 text-sm-md ">
          Maximum length
        </div>
        <div className=" text-gray-4 text-sm-regular">{max_tokens || "-"}</div>
      </div>

      <div className="flex h-[24px] justify-between items-center self-stretch">
        <div className="flex items-center gap-xxs text-gray-5 text-sm-md ">
          Top P
        </div>
        <div className=" text-gray-4 text-sm-regular">{top_p || "-"}</div>
      </div>

      <div className="flex h-[24px] justify-between items-center self-stretch">
        <div className="flex items-center gap-xxs text-gray-5 text-sm-md ">
          Frequency penalty
        </div>
        <div className=" text-gray-4 text-sm-regular">
          {frequency_penalty || "-"}
        </div>
      </div>

      <div className="flex h-[24px] justify-between items-center self-stretch">
        <div className="flex items-center gap-xxs text-gray-5 text-sm-md ">
          Presence penalty
        </div>
        <div className=" text-gray-4 text-sm-regular">
          {presence_penalty || "-"}
        </div>
      </div>

      <div className="flex h-[24px] justify-between items-center self-stretch">
        <div className="flex items-center gap-xxs text-gray-5 text-sm-md ">
          Stop sequences
        </div>
        <div className=" text-gray-4 text-sm-regular">
          {stop_sequence || "-"}
        </div>
      </div>
    </div>
  );
};
