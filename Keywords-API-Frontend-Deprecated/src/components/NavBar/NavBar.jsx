import React, { useEffect } from "react";
import "./static/css/style.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "src/store/actions";
import NavRight from "../NavRight/NavRight";
import NavMiddle from "../NavMiddle/NavMiddle";
import KeywordsLogo from "src/components/KeywordsLogo/KeywordsLogo";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  getUser,
};

function NavBar({ user, getUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, []);
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, []);

  return (
    <>
      <div className={"nav-bar"}
        style={{
          backgrounColor: "rgba(249, 250, 252, 0.7)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        }}
      >
        <div
          className="justify-between flex w-full max-w-[1200px]"
        >
          <KeywordsLogo />
          {windowSize > 768 && <NavMiddle user={user} />}
          <NavRight user={user} windowSize={windowSize} />
        </div>
      </div>
      <div
        className="nav-placeholder"
        style={{
          height: windowSize > 768 ? (user?.email ? "53px" : "61px") : "45px",
          width: "100%",
        }}
      />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
