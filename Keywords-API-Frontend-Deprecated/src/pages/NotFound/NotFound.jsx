import React from "react";
import { Arrow } from "src/assets/svgs.jsx";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {};
function NotFound({ user }) {
  const navigate = useNavigate();
  return (
    <div className="main-section-bottom bg-white" style={{ flexGrow: 1 }}>
      <div className="max-width-container">
        <div className="flex-col items-center gap-sm self-stretch">
          <div className="display-lg text-black">404 - Not Found</div>
          <div className="text-lg text-gray4">
            Couldn't find what you were looking for. Let's find a better place
            for you to go to.
          </div>
        </div>
        <div className="flex-col corss-center">
          <button
            className="button-primary"
            onClick={() => {
              window.history.back();
            }}
          >
            Back to home
            <Arrow />
          </button>
          <button
            className="button-header"
            onClick={() => {
              window.open(
                "https://airtable.com/appVPjek12fgZXMaa/shrKnkYcon4XI14Px",
                "_blank"
              );
            }}
          >
            Bug report
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
