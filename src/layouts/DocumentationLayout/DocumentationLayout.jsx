import React from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { PanelDocumentation } from 'src/components/Sections';
import { sections } from 'src/pages/PlatformPages/DocumentationPages/DocumentationPages';

const DocumentationLayout = () => {
  const PlatformDrawerMemo = React.memo(PanelDocumentation);
  return (
    <div aria-label='documentation-pages' className="flex-row self-stretch flex-1 max-h-[calc(100vh-53px)] overflow-hidden">
      <PlatformDrawerMemo sections={sections} />
      <Outlet />
    </div>
  );
}

DocumentationLayout.propTypes = {
  // bla: PropTypes.string,
};

DocumentationLayout.defaultProps = {
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
)(DocumentationLayout);
