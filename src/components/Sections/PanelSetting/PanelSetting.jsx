import React from 'react'
import { connect } from 'react-redux'
import { SectionMenu } from 'src/components/Sections'

export const PanelSetting = ({ sections }) => {
  return (
    <div className="flex-col self-stretch w-[280px] py-lg pl-lg pr-md items-start gap-lg flex-shrink-0 bg-gray-2 border-r border-gray-3">
      {sections && sections.length > 0 && sections.map((section, index) => (<SectionMenu
        key={index}
        section={section}
      />))}
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PanelSetting)