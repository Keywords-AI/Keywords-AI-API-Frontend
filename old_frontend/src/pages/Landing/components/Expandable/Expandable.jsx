import React from 'react'
import "./static/css/style.css"
import { CircularExpadable } from 'src/assets/svgs'

export default function Expandable(props) {
    const [expanded, setExpanded] = React.useState(false)
    const [hover, setHover] = React.useState(false)
    const answerRef = React.useRef(null)
    React.useEffect(() => {
        if (expanded && answerRef?.current) {
            answerRef.current.style.height = (answerRef.current.scrollHeight) + "px"
        } else {
            answerRef.current.style.height = "0px"
        }
    }, [expanded]);

    return (
        <div className="qa-item"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="expandable-button"
                onClick={() => setExpanded(!expanded)}
            >
                <span className="display-xs" style={{
                    color: hover && !expanded ? "#AAA" : "var(--white)",
                    maxWidth: "calc(100% - 40px)",
                }}>
                    {props.question}
                </span>
                <CircularExpadable expanded={expanded} fillColor={hover && !expanded ? "#AAA" : "var(--white)"} />
            </div>
            <div className={"answer text-md text-gray3" + (expanded ? " expanded" : "")} ref={answerRef}
                style={{
                    cursor: "default"
                }}
            
            >
                <span>
                    {props.answer}
                </span>
            </div>
        </div>
    )
}
