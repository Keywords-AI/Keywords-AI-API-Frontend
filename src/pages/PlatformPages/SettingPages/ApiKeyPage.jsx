import React from 'react'
import { connect } from 'react-redux'
import { SettingTable } from 'src/components/Tables'
import { Button } from 'src/components/Buttons'
import { Pencil } from 'src/components/Icons'
import { getDateStr } from 'src/utilities/stringProcessing'
import { CreateForm } from './components/APIKeyForms'
import { PageContent, PageParagraph } from 'src/components/Sections'
import { SelectInput, CopyInput } from 'src/components/Inputs'
import { Modal } from 'src/components/Dialogs'

const mapStateToProps = (state) => ({
  user: state.user,
  apiKey: state.apiKey,
})

const mapDispatchToProps = {}

export const ApiKeyPage = ({ apiKey }) => {
  const testRows = [
    // {
    //   name: getDateStr('2021-08-01'), key: '$10',
    //   created: getDateStr('2021-08-01'),
    //   lastUsed: getDateStr('2021-08-01'),
    //   action: <Button
    //     variant="small"
    //     text="Edit"
    //     icon={Pencil}
    //     iconSize="sm"
    //   />
    // },
  ]
  const [openCreate, setOpenCreate] = React.useState(false)
  return (
    <PageContent
      title="API Keys"
      subtitle="Read the documentation on using our API here."
    >
      <PageParagraph>
        {apiKey?.keyList && apiKey?.keyList.length > 0 && < SettingTable
          variant={"api-keys"}
          rows={testRows}
        />}
        <Button variant="r4-primary" text="Generate new Key" onClick={() => setOpenCreate(!openCreate)} />
      </PageParagraph>
      <Modal
        title="Create new API key"
        open={openCreate}
        setOpen={setOpenCreate}
      >
        <CreateForm setShowForm={setOpenCreate} />
      </Modal>
    </PageContent>
  )
}



export default connect(mapStateToProps, mapDispatchToProps)(ApiKeyPage)

