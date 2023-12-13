import React from 'react'
import { connect } from 'react-redux'
import { SectionMenu } from 'src/components/Sections'
import { sections as settingSections } from 'src/pages/PlatformPages/SettingPages/SettingPages';
import { sections as documentationSections } from 'src/pages/PlatformPages/DocumentationPages/DocumentationPages';

export const PanelNavigation = ({ sectionName, sections = [] }) => {
  switch (sectionName) {
    case 'setting':
      sections = settingSections;
      break;
    case 'documentation':
      sections = documentationSections;
      break;
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(PanelNavigation)