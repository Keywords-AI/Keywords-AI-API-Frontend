import React from "react";
import "./static/css/style.css"
import { connect } from "react-redux";
import DrawerList from "src/components/DrawerList/DrawerList";

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = {
};


const PlatformLeftDrawer = ({ searchBox, listTitle, sections, user }) => {
    return (
        <div className="platform-left-drawer">
            {sections.map((section, index) => (
                <DrawerList user={user} title={section.title} options={section.pages} key={index} />
            ))}
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformLeftDrawer);
