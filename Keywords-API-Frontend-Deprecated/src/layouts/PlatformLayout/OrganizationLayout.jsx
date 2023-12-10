import React from 'react'
import DocumentLeftDrawer from 'src/components/DocumentLeftDrawer/DocumentLeftDrawer'
import { Outlet } from 'react-router-dom'

export default function OrganizationLayout() {
    return (
        <div className="flex-row flex-1   
        >
            <DocumentLeftDrawer />
            <Outlet />
        </div>
    )
}
