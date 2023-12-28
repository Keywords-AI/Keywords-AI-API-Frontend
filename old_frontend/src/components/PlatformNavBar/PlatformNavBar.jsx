import React, { useEffect } from "react";
import { Dot, Arrow, Avatar, Logo } from "src/assets/svgs";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "src/store/actions";
import NavRight from "../NavRight/NavRight";
import NavMiddle from "../NavMiddle/NavMiddle";
import KeywordsLogo from "../KeywordsLogo/KeywordsLogo";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  getUser,
};

function NavBar({ user, getUser }) {
  const navigate = useNavigate()
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
      <div className={"platform-nav-bar bg-white"}>
        <div className="flex-row items-center gap-md">
          <div className="flex-col hover-cp"
            onClick={() => {
              if (user?.email) {

                navigate("/platform/overview")
              } else {
                navigate("/")
              }
            }}
          >
          <Logo fill={"var(--gray4)"} />
          </div>
          {windowSize > 768 && <NavMiddle user={user} />}
        </div>
        <NavRight user={user} windowSize={windowSize} />
      </div>
      <div
        className="nav-placeholdeer"
        style={{
          height: windowSize > 768 ? "53px" : "45px",
          width: "100%",
        }}
      ></div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
