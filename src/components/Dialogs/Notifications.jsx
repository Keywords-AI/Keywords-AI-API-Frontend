import React from 'react'
import { connect } from 'react-redux'
import { NotificationCard } from 'src/components/Cards'
import { dispatchNotification } from 'src/store/actions/notificationAction'

const mapStateToProps = (state) => ({
    notifications: state.notification.notifications
})

const mapDispatchToProps = {
    dispatchNotification
}


export const Notifications = ({ notifications }) => {

    return (
        <div className="flex-col items-start fixed top-lg right-lg gap-sm z-[1200] translate-y-[54px]">
            {
                notifications?.map((notification, index) => {
                    console.log("Notification", notification);
                    return (
                        <NotificationCard
                            key={index}
                            {...notification}
                            dismissNotification={dispatchNotification}
                        />
                    );
                })
            }
        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(Notifications)