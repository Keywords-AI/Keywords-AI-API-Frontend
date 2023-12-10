import React from "react";
import EditableBox from "src/components/EditableBox/EditableBox";
import { DeleteMessage, ErrorWarning } from "src/assets/svgs";

export default function PlaygroundMessage({
  index,
  message,
  error,
  handleInput,
  handleDelete,
  streaming,
}) {
  const [hover, setHover] = React.useState(false);
  const isApiError = (text) => {
    return (
      text.includes("You need to generate a key first") ||
      text.includes("This key is not active")
    );
  };
  const noApiError = (
    <div className="text-md ">
      <span>{"No active API key detected. Go to "}</span>
      <a
        style={{ textDecoration: "none" }}
        href="/platform/organization/api-keys"
        className="text-primary"
      >
        API Keys
      </a>
      <span>{" or "}</span>
      <a
        style={{ textDecoration: "none" }}
        href="/platform/organization/billing"
        className="text-primary"
      >
        billing
      </a>
      <span>{" for more details."}</span>
    </div>
  );

  const usegeError = (
    <div className="text-md ">
      <span>{"You've reached your usage limit. See your "}</span>
      <a
        style={{ textDecoration: "none" }}
        href="/platform/organization/usage"
        className="text-primary"
      >
        usage
      </a>
      <span>{" or "}</span>
      <a
        style={{ textDecoration: "none" }}
        href="/platform/organization/billing"
        className="text-primary"
      >
        billing
      </a>
      <span>
        {
          " for more details.  If you have further questions, please contact us at team@keywordsai.co"
        }
      </span>
    </div>
  );
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`flex-col justify-start items-start self-stretch gap-xxs ${
        error
          ? "bg-red-light"
          : message?.role === "User"
          ? "bg-gray2"
          : "bg-white"
      }`}
    >
      <div
        className={"flex-row justify-start items-center gap-xxs self-stretch"}
      >
        {!error ? (
          <>
            {hover && (
              <div
                style={{
                  width: "16px",
                  height: "16px",
                }}
                onClick={() => {
                  handleDelete(index);
                }}
              >
                <DeleteMessage />
              </div>
            )}
            <div className="text-md t-medium">
              {message.role === "User" ? "User" : "Keywords AI"}
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                width: "16px",
                height: "16px",
              }}
              onClick={() => {
                handleDelete(index);
              }}
            >
              <ErrorWarning />
            </div>

            <div className="text-md t-error">{"Error"}</div>
          </>
        )}
      </div>
      {!error ? (
        <EditableBox
          value={message.content}
          handleInput={handleInput}
          placeholder={"Enter your message..."}
          streaming={streaming}
        />
      ) : isApiError(message) ? (
        noApiError
      ) : (
        usegeError
      )}
    </div>
  );
}
