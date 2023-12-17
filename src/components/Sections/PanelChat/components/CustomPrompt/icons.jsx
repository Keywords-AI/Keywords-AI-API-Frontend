import React from "react";


export const FileUpload = () => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5549 7.6047L7.92939 13.2303C6.39823 14.7614 4.10189 14.9422 2.54077 13.3811C1.00961 11.8499 1.20861 9.63172 2.76973 8.0706L9.09345 1.74689C10.0613 0.779051 11.6194 0.779051 12.5872 1.74689C13.5551 2.71472 13.5551 4.27285 12.5872 5.24068L6.15249 11.6754C5.6701 12.1578 4.88798 12.1578 4.40559 11.6754C3.9232 11.193 3.9232 10.4109 4.40559 9.92854L10.1422 4.19194" stroke="#B1B3BC" stroke-linecap="square" />
        </svg>

    )
}

export const File = () => {
    return (
        <div className="flex flex-shrink-0">
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.8 8.4V1.8L17.4 8.4M2.4 0C1.068 0 0 1.068 0 2.4V21.6C0 22.2365 0.252856 22.847 0.702944 23.2971C1.15303 23.7471 1.76348 24 2.4 24H16.8C17.4365 24 18.047 23.7471 18.4971 23.2971C18.9471 22.847 19.2 22.2365 19.2 21.6V7.2L12 0H2.4Z" fill="#6188ED" />
            </svg>
        </div>
    )
}

export const Close = () => {
    return (
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0.805714L7.19429 0L4 3.19429L0.805714 0L0 0.805714L3.19429 4L0 7.19429L0.805714 8L4 4.80571L7.19429 8L8 7.19429L4.80571 4L8 0.805714Z" fill="#B1B3BC" />
        </svg>

    )
}

export const CheckBox = ({ onChecked = () => { }, checked = false }) => {
    const [isChecked, setIsChecked] = React.useState(checked);
    const setChecked = () => {
        onChecked(!checked);
    }
    return (
        <div className="flex flex-shrink-0"
            onClick={() => {
                setIsChecked(!isChecked);
                setChecked();
            }}
        >
            {isChecked ?
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="15" height="15" fill="#05050A" />
                    <rect x="0.5" y="0.5" width="15" height="15" stroke="#B1B3BC" />
                    <rect width="8" height="8" transform="translate(4 4)" fill="#F9FAFC" />
                </svg> :
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="15" height="15" fill="#05050A" />
                    <rect x="0.5" y="0.5" width="15" height="15" stroke="#3E424A" />
                </svg>}
        </div>
    )
}

