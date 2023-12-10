import React from 'react'

export default function IconButton({ onClick, icon, className="" }) {
    return (
        <div className={"flex flex-shrink-0 " + className} onClick={onClick}>
            {icon}
        </div>
    )
}
