import React, { useEffect } from 'react'
import "./NotificationCard.css"
import { IconButton } from 'src/components/Buttons'
import { Cross, Success } from 'src/components/Icons'
import { dismissNotification } from 'src/store/actions'
import cn from 'src/utilities/classMerge'

const mapStateToProps = (state) => ({});
const mapDispatchToProps = { dismissNotification };

export default function NotificationCard({
    id = "notification-id",
    title = "Notification title",
    message = "Notification message",
    dismissNotification,
}) {
    const [show, setShow] = React.useState(false);
    const cardRef = React.useRef(null)
    const handleDismiss = (e) => {
        e.preventDefault();
        setShow(false);
        setTimeout(() => {
            dismissNotification(id);
        }, 1000)
    }
    useEffect(() => { setShow(true) }, [])
    return (
        <div
            ref={cardRef}
            className={cn("card-notification flex item-start py-sm px-md relative shadow-gray-3 rounded-md shadow-window w-[360px] transition-all duration-[600ms] ease-in-out",
            )
            }
        >
            < div className="flex-row gap-xxs self-stretch" >
                <div className="flex-col gap-xxs">
                    <div className="flex-row gap-xxs items-center">
                        <Success />
                        <span className="text-gray-white text-sm-md">
                            {title}
                        </span>
                    </div>
                    <span className="caption text-gray-4 pl-[24px]">
                        {message}
                    </span>
                </div>
            </div >
            <IconButton
                icon={Cross}
                onClick={handleDismiss}
                className="absolute top-md right-md"
            />
        </div >
    )
}
