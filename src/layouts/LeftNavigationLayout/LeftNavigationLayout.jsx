import React, { useEffect } from "react";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import PanelNavigation from "src/components/Sections/PanelNavigation";
import { settingChildren } from "src/pages/PlatformPages/SettingPages/SettingPages";

const LeftNavitationLayout = ({ sectionName }) => {
  const { enableScope, disableScope } = useHotkeysContext();
  // console.log("sectionName", settingChildren);
  const currPath = window.location.pathname.split("/").pop();
  const nextIndex = settingChildren.findIndex(
    (child) => child.path === currPath
  );
  const nextPath = settingChildren[nextIndex + 1]?.path;
  console.log("nextPath", nextPath);
  useEffect(() => {
    enableScope("leftNav");
    return () => {
      disableScope("leftNav");
    };
  }, []);

  useHotkeys(
    "up",
    () => {
      console.log("up");
    },
    { scopes: "leftNav" }
  );
  useHotkeys(
    "down",
    () => {
      console.log("down");
    },
    { scopes: "leftNav" }
  );
  const PlatformDrawerMemo = React.memo(PanelNavigation);
  return (
    <div
      aria-label="setting-pages"
      className="flex-row self-stretch flex-1 max-h-[calc(100vh-54px)] overflow-auto"
    >
      <PlatformDrawerMemo sectionName={sectionName} />
      <Outlet />
    </div>
  );
};

LeftNavitationLayout.propTypes = {
  // bla: PropTypes.string,
};

LeftNavitationLayout.defaultProps = {
  // bla: 'test',
};

const mapStateToProps = (state) => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = (dispatch) => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftNavitationLayout);
