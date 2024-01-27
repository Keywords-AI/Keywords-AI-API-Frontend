import React from "react";
import { connect } from "react-redux";

type CardProps = {
  title: string;
  description: string;
  image: string;
};

const mapStateToProps = (state: { any: any }) => ({});

const mapDispatchToProps = {};

const TestCardNotConnected: React.FC<CardProps> = (props) => {
  return <div>TestCard</div>;
};

export const TestCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestCardNotConnected);
