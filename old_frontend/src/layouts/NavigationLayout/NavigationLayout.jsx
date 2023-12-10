import React from "react";
import "./static/css/style.css";
import { Outlet } from "react-router-dom";
import NavBar from "src/components/NavBar/NavBar";
import Footer from "src/components/Footer/Footer";
import { connect } from "react-redux";
import PlatformNavBar from "src/components/PlatformNavBar/PlatformNavBar";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {};

function NavigationLayout({ user }) {
  return (
    <div className="nav-bar-layout">
      {user?.email ? <PlatformNavBar /> : <NavBar />}
      <Outlet />
      {!user?.email && <Footer />}
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationLayout);


