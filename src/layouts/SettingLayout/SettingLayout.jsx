import React from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import PanelSetting from 'src/components/Sections/PanelSetting';
import { sections } from 'src/pages/PlatformPages/SettingPages/SettingPages';

const SettingLayout = () => {
  const PlatformDrawerMemo = React.memo(PanelSetting);
  return (
    <div aria-label='setting-pages' className="flex-row self-stretch flex-1 max-h-[calc(100vh-53px)] overflow-hidden">
      <PlatformDrawerMemo sections={sections} />
      <Outlet />
    </div>
  );
}

SettingLayout.propTypes = {
  // bla: PropTypes.string,
};

SettingLayout.defaultProps = {
  // bla: 'test',
};

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingLayout);
