import React from 'react'
import SmallTextTitle from '../Titles/SmallTextTitle/SmallTextTitle'

export default function FooterPage({ title, subtitle, content, actions }) {
    return (
        <div className="flex-col items-center self-stretch gap-lg px-xxl pt-xxl pb-xxxxl flex-1   bg-white">
            <div className="flex-col gap-lg items-start"
                style={{
                    width: "800px"
                }}
            >
                <SmallTextTitle
                    title={title}
                    subtitle={subtitle}
                />
                <div className="flex-col items-start self-stretch gap-md">
                    <div className="text-md text-gray4">
                        {content}
                    </div>
                    {actions}
                </div>
            </div>
        </div>
    )
}
