import React, { useEffect } from "react";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
import { connect } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import PanelNavigation from "src/components/Sections/PanelNavigation";
import { settingChildren } from "src/pages/PlatformPages/SettingPages/SettingPages";

const LeftNavitationLayout = ({ sectionName }) => {
  const { enableScope, disableScope } = useHotkeysContext();
  const pages = settingChildren
    .map((child) => child.path)
    .filter((child) => child.length > 0);
  const currPath = window.location.pathname.split("/").pop();
  const nextIndex = pages.findIndex((child) => child === currPath);
  const navigate = useNavigate();

  useEffect(() => {
    enableScope("leftNav");
    return () => {
      disableScope("leftNav");
    };
  }, []);

  useHotkeys(
    "up",
    () => {
      const nextPath = pages[(nextIndex + pages.length - 1) % pages.length];
      navigate(nextPath);
    },
    { scopes: "leftNav" }
  );
  useHotkeys(
    "down",
    () => {
      const nextPath = pages[(nextIndex + pages.length + 1) % pages.length];
      navigate(nextPath);
    },
    { scopes: "leftNav" }
  );
  // const PlatformDrawerMemo = React.memo(PanelNavigation);
  useEffect(() => {}, []);
  return (
    <div
      aria-label="setting-pages"
      className="flex-row self-stretch flex-1 max-h-[calc(100vh-54px)] overflow-auto"
    >
      <PanelNavigation sectionName={sectionName} />
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
