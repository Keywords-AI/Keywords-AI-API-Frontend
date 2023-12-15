import React from 'react'
import { connect } from 'react-redux'
import { NotificationCard } from 'src/components/Cards'
const defaultNotifications = [
    // {
    //     title: "Success",
    //     message: "Your organization has been successfully updated.",
    //     type: "success"
    // },
    // {
    //     title: "Success",
    //     message: "Your organization has been successfully updated.",
    //     type: "success"
    // },
]
export const Notifications = ({ notifications=defaultNotifications }) => {

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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)