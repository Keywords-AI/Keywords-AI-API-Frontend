import React from 'react'
import { IconButton } from 'src/components/Buttons'
import { Cross, Success } from 'src/components/Icons'
import "./NotificationCard.css"

export default function NotificationCard({ title = "Notification title", message = "Notification message" }) {
    return (
        <div className="card-notification flex item-start py-sm px-md relative shadow-border shadow-gray-3 rounded-md shadow-window w-[360px]">
            <div className="flex-row gap-xxs self-stretch">
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
            </div>
            <IconButton
                icon={Cross}
                className="absolute top-md right-md"
            />
        </div>
    )
}
