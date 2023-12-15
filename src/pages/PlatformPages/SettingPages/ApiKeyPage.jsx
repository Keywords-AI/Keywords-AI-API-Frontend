import React from 'react'
import { connect } from 'react-redux'
import { SettingTable } from 'src/components/Tables'
import { Button } from 'src/components/Buttons'
import { Pencil } from 'src/components/Icons'
import { getDateStr } from 'src/utilities/stringProcessing'
import { CreateForm } from './components/APIKeyForms'
import { PageContent, PageParagraph } from 'src/components/Sections'
import { SelectInput, CopyInput } from 'src/components/Inputs'



export const ApiKeyPage = (props) => {
  const testRows = [
    {
      name: getDateStr('2021-08-01'), key: '$10',
      created: getDateStr('2021-08-01'),
      lastUsed: getDateStr('2021-08-01'),
      action: <Button
        variant="small"
        text="Edit"
        icon={Pencil}
        iconSize="sm"
      />
    },
  ]
  return (
    <PageContent
      title="API Keys"
      subtitle="Read the documentation on using our API here."
    >
      <PageParagraph>
        <SettingTable
          variant={"api-keys"}
          rows={testRows}
        />
        <Button variant="r4-primary" text="Generate new Key" />
      </PageParagraph>
      <CreateForm />
      <SelectInput placeholder={"Hi"} />
      <CopyInput />
    </PageContent>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ApiKeyPage)