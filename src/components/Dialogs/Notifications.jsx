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


export const Notifications = ({ notifications, dispatchNotification }) => {

    return (
        <div className="flex-col items-start fixed top-xxxl right-xxxl gap-sm">
            {
                notifications?.map((notification, index) => (
                    <NotificationCard
                        key={index}
                        {...notification}
                    />
                ))
            }
        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(Notifications)