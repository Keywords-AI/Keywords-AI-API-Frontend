import React from 'react'
import { Logo } from 'src/components/Icons/icons'

export default function HeaderLogo() {
    return (
        <div className="flex-row gap-xxs items-center">
            <Logo />
            <span className="display-sm">Keywords AI</span>
        </div>
    )
}
