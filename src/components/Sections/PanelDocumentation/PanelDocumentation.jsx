import React from 'react';
import { connect } from 'react-redux';

const PanelDocumentation = (props) => (
  <div className="PanelDocumentationWrapper">
    Test content
  </div>
);

PanelDocumentation.propTypes = {
  // bla: PropTypes.string,
};

PanelDocumentation.defaultProps = {
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
)(PanelDocumentation);
