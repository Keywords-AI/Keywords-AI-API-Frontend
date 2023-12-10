import React from "react";
import "./static/css/style.css";
import { Arrow } from "src/assets/svgs.jsx";
import CodeBox from "src/components/CodeBox/CodeBox.jsx";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  pickExample: (example) => {
    return {
      type: "PICK_EXAMPLE",
      payload: example,
    };
  },
};

function ExampleCard({ pickExample, ...props }) {
  const {
    icon,
    title,
    description,
    systemPrompt,
    userPrompt,
    sampleResponse,
    apiRequests,
  } = props;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    console.log("open", open);
  }, [open]);
  const detailRef = React.useRef(null);
  const handleClick = (e) => {
    if (detailRef.current && !detailRef.current.contains(e.target)) {
      setOpen(false);
    }
  };
  return (
    <>
      <div
        className="example-card"
        onClick={() => {
          setOpen(true);
        }}
      >
        {icon}
        <div className="flex-col justify-start items-start self-stretch">
          <div className="text-md t-medium">{title}</div>
          <div className="text-md text-gray4">{description}</div>
        </div>
      </div>
      {open && (
        <div className="backdrop" onClick={handleClick}>
          <div className="detail-container bg-white" ref={detailRef}>
            <div className="flex-row justify-center items-start gap-md self-stretch">
              <div className="flex-row justify-start items-start gap-xs self-stretch flex-1  ">
                {icon}
                <div className="flex-col justify-start items-start self-stretch">
                  <div className="display-xs">{title}</div>
                </div>
              </div>
              <button
                className="button-primary"
                onClick={() => {
                  pickExample(props);
                  navigate("/platform/playground");
                }}
              >
                <span>{"Open in Playground"}</span>
                <Arrow />
              </button>
            </div>
            <div className="text-md text-gray4 t-l">{description}</div>

            {systemPrompt && (
              <div className="flex-col justify-start items-start self-stretch gap-xxs">
                <div className="text-md t-medium">{"System"}</div>
                <div className="text-md text-black">{systemPrompt}</div>
              </div>
            )}
            {userPrompt && (
              <div className="flex-col justify-start items-start self-stretch gap-xxs bg-gray2">
                <div className="text-md t-medium">{"User"}</div>
                <div className="text-md text-black">{userPrompt}</div>
              </div>
            )}
            <div className="line"></div>
            {sampleResponse && (
              <div className="flex-col justify-start items-start self-stretch gap-xxs">
                <div className="text-md t-medium">{"Sample Response"}</div>
                <div className="text-md text-black">{sampleResponse}</div>
              </div>
            )}
            <div className="line"></div>
            {apiRequests && (
              <div className="flex-col justify-start items-start self-stretch gap-xxs">
                <div className="text-md t-medium">{"API request"}</div>
                <CodeBox codeObjs={apiRequests} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleCard);
