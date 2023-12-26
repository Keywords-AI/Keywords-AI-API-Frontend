import React from 'react'
import { connect } from 'react-redux'
import { SectionMenu } from 'src/components/Sections'
import { sections as settingSections } from 'src/pages/PlatformPages/SettingPages/SettingPages';
import { sections as documentationSections } from 'src/pages/PlatformPages/DocumentationPages/DocumentationPages';
import { sections as qaWallSections } from 'src/pages/PlatformPages/QaPages/QaPages';
import { getBillings, getKeys } from 'src/store/actions';


export const PanelNavigation = ({ getBillings, getKeys, sectionName, sections = [], basePath = "/platform/setting" }) => {
  switch (sectionName) {
    case 'setting':
      basePath = "/platform/setting";
      sections = settingSections;
      getBillings(); //Calling this here to cache the result for later
      getKeys();
      break;
    case 'documentation':
      basePath = "/platform/doc";
      sections = documentationSections;
      break;
    case 'qa-wall':
      basePath = "/platform/qa-wall";
      sections = qaWallSections;
      break;
  }
  return (
    <div className="flex-col self-stretch w-[280px] py-lg pl-lg pr-sm items-start gap-lg flex-shrink-0 bg-gray-2 shadow-border-r shadow-gray-3">
      {sections && sections.length > 0 && sections.map((section, index) => (<SectionMenu
        basePath={basePath}
        key={index}
        section={section}
      />))}
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { getBillings,
  getKeys }

export default connect(mapStateToProps, mapDispatchToProps)(PanelNavigation)