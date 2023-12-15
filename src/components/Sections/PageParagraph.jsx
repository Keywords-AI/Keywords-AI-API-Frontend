import React from 'react'
import { Divider } from 'src/components/Sections'
import { TitleStaticSubheading } from 'src/components/Titles'

/*
Paragraphs under PageContent
*/

export default function PageParagraph({ children, heading, subheading }) {
    return (
        <div className="flex-col self-stretch items-start gap-sm">
            <Divider />
            <TitleStaticSubheading
                title={heading}
                subtitle={subheading}
            />
            {children}
        </div>
    )
}
