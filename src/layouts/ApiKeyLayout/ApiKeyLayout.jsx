import React from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import PanelApi from 'src/components/Sections/PanelApi';

const ApiKeyLayout = ({sections}) => {
  const PlatformDrawerMemo = React.memo(PanelApi);
  return (
    <div aria-label='lol'  className="flex-row self-stretch flex-1 max-h-[calc(100vh-53px)] overflow-hidden">
      <PlatformDrawerMemo sections={sections} />
      <Outlet />
    </div>
  );
}

ApiKeyLayout.propTypes = {
  // bla: PropTypes.string,
};

ApiKeyLayout.defaultProps = {
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
)(ApiKeyLayout);
