import React from 'react'
import { useNavigate } from 'react-router-dom'
import { textToLink } from 'src/utilities/utilities'

export default function DrawerList({ title, options, user }) {
    const navigate = useNavigate();
    var last_part = window.location.href.split("/").pop();
    return (
        <div className="flex-col gap-xs items-start self-stretch bg-white">
            <div className="flex-col gap-xs items-start self-stretch bg-white">

                <div className="text-md t-medium pl-lg"
                >
                    {title}
                </div>
                <div className="flex-col self-stretch pl-sm">
                    {options?.length > 0 && options.map((option, index) => {

                        if (option.forAdmin && !user?.is_admin) {
                            return;
                        }
                        if (option.subscribedOnly && !user?.organization?.owner?.active_subscription && !user?.is_admin) return;
                        return (
                            <button
                                key={index}
                                className={`button-context-menu text-sm ${last_part === textToLink(option?.title || "") ? "active" : ""}`}
                                onClick={() => {
                                    if (option.forAdmin && !user?.is_admin) return;
                                    navigate(textToLink(option?.title));
                                }}
                                style={{
                                    cursor: option.forAdmin && !user.is_admin ? "not-allowed" : "pointer",
                                }}
                            >
                                {option.title}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
