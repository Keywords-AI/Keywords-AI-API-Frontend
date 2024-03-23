import React, { useEffect } from "react";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
import { connect } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { BCrumb } from "src/components/Sections/BreadCrumb/BreadCrumb";
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
  const items = [
    {
      label: "Settings",
      link: "/platform/api",
    },
    {
      label: ["settings", "admin"].includes(currPath) ? "User" : "Orgnization",
      link: "/platform/api",
    },
    {
      label: currPath.charAt(0).toUpperCase() + currPath.slice(1),
      link: "/platform/api/" + currPath,
    },
  ];
  // const PlatformDrawerMemo = React.memo(PanelNavigation);
  return (
    <div
      aria-label="setting-pages"
      className="flex-row self-stretch flex-1 h-screen overflow-auto"
    >
      <PanelNavigation sectionName={sectionName} />
      <div className="flex-col justify-start items-start flex-1 self-stretch h-screen">
        <div className="flex h-[52px] py-xs px-lg items-center gap-xxs  ml-[240px]  text-gray-5  shadow-border-b shadow-gray-2 max-h-[52px] self-stretch">
          <BCrumb items={items} />
        </div>
        <div className="w-full overflow-auto">
          {" "}
          <Outlet />
        </div>
      </div>
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
