import React from 'react'
import { getDateStr } from 'src/utilities/utilities';
import { Arrow } from 'src/assets/svgs';
import { useNavigate } from 'react-router-dom';

export default function CurrentPlanCard({
    title,
    description,
    user,
    link,
    activationText,
    expirationText,
    titleColor = "var(--primary)",
    borderColor = "var(--primary100)",
    linkText = "View usage"
}) {
    const formattedToday = getDateStr(new Date(), false, false);
    const [hover, setHover] = React.useState(false);
    const navigate = useNavigate();
    return (
        <div className={"flex-col items-start gap-lg p-md hover-cp" + (hover ? " bg-gray2" : " bg-white")}
            style={{
                width: "280px",
                boxShadow: `0 0 0 1px ${borderColor}`,
                boxSizing: "border-box",
            }}
            onClick={() => navigate(link)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="flex-col gap-xs items-start self-stretch">
                <div className="display-xs"
                    style={{
                        color: titleColor,
                    }}
                >
                    {title}
                </div>
                <div className="text-md text-black t-pre-wrap">
                    {description}
                </div>
            </div>
            <div className="flex-col items-start gap-xxs self-stretch">
                {activationText && <div className="text-md text-gray4">
                    {activationText + " " + formattedToday}
                </div>}
                {expirationText && <div className="text-md text-gray4">
                    {expirationText + " " + formattedToday}
                </div>}
                <div className="text-primary text-md flex-row gap-xxs items-center"
                >
                    <span>{linkText}</span>
                    <Arrow fill={"var(--primary)"} />
                </div>
            </div>
        </div>
    )
}
