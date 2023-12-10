import React from 'react'
import Paragraph from 'src/components/Document/Paragraph'
import PlatformSubpageTitle from 'src/components/Titles/PlatformSubpageTitle/PlatformSubpageTitle'

export default function DocumentationPage({ title, subtitle, paragraphs }) {
    return (
        <div className="platform-right-container pb-xxxxl"
         style={{
            gap: "32px"
         }}
        >
            <div className="flex-col items-start flex1 gap-lg self-stretch"
                style={{
                    maxWidth: "860px"
                }}
            >
                <PlatformSubpageTitle title={title} subtitle={subtitle}/>
                {paragraphs?.length > 0 && paragraphs.map((paragraph, index) => (
                    <Paragraph key={index} {...paragraph} />
                ))}
            </div>
        </div>
    )
}