import React from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import PanelSetting from 'src/components/Sections/PanelNavigation';

const LeftNavitationLayout = ({ sectionName }) => {
  const PlatformDrawerMemo = React.memo(PanelSetting);
  return (
    <div aria-label='setting-pages' className="flex-row self-stretch flex-1 max-h-[calc(100vh-53px)] overflow-hidden">
      <PlatformDrawerMemo sectionName={sectionName} />
      <Outlet />
    </div>
  );
}

LeftNavitationLayout.propTypes = {
  // bla: PropTypes.string,
};

LeftNavitationLayout.defaultProps = {
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
)(LeftNavitationLayout);
