import React from 'react'
import { connect } from 'react-redux'
import GetStarted from 'src/pages/GetStarted/GetStarted';

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}

const mapDispatchToProps = {}

function SubscriptionOnly({ children, user }) {
    console.log(user)
    return (
        <>
            {
            user?.active_subcription || user?.organization?.owner?.active_subcription?
                 children  : <GetStarted />
            }
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionOnly)