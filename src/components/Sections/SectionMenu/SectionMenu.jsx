import React from 'react'
import { connect } from 'react-redux'
import { User } from 'src/components/Icons'
import { Button } from 'src/components/Buttons'
import { useNavigate } from 'react-router-dom'

const SectionMenu = ({ section, basePath = "/platform/setting" }) => {
  const pages = section?.pages || [];
  const title = section?.title || "Section Title Here";
  const icon = section?.icon || <User />;
  const navigate = useNavigate()
  return (
    <div className="flex-row gap-xxs items-start self-stretch ">
      <div className="flex h-6 items-center">
        {icon}
      </div>
      <div className="flex-col items-start gap-xs flex-1">
        <div className="flex px-xs items-start text-md-medium text-gray-white">
          {title || "Section Title Here"}
        </div>
        <div className="flex-col flex-start self-stretch">
          {pages && pages.length > 0 && pages.map((page, index) => {
            if (page?.default) return;
            return (
              <Button
                active={window.location.pathname.includes(`${basePath}/${page?.path}`)}
                text={page.title}
                key={index}
                variant="panel"
                onClick={() => { navigate(`${basePath}/${page?.path}`) }}
              />)
          }
          )}
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SectionMenu)