import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { SettingTable } from 'src/components/Tables'
import { Button, IconButton } from 'src/components/Buttons'
import { Pencil, Delete } from 'src/components/Icons'
import useFetch from 'src/hooks/useFetch'
import { CreateForm, EditForm, DeleteForm } from './components/APIKeyForms'
import { PageContent, PageParagraph } from 'src/components/Sections'
import { Modal } from 'src/components/Dialogs'
import { setKeyList, setEditingKey, setDeletingKey } from 'src/store/actions'

const mapStateToProps = (state) => ({
  user: state.user,
  apiKey: state.apiKey,
})

const mapDispatchToProps = {
  setKeyList,
  setEditingKey,
  setDeletingKey
}

export const ApiKeyPage = ({ apiKey, setKeyList, setEditingKey, setDeletingKey }) => {
  const { data: prevKey, error: prevError, loading: prevLoading } = useFetch({ path: `api/get-keys` });
  const [openCreate, setOpenCreate] = React.useState(false)
  const editingTrigger = (key) => {
    return (
      <>
        <Button
          variant="small"
          text={"Edit"}
          icon={Pencil}
          onClick={() => setEditingKey(key)}
        />
        {/* <IconButton
          icon={<Delete />}
          onClick={() => setDeletingKey(key)}
        /> */}
      </>
    )
  }
  useEffect(() => { setKeyList(prevKey, editingTrigger) }, [prevKey])
  return (
    <PageContent
      title="API Keys"
      subtitle="Read the documentation on using our API here."
    >
      <PageParagraph>
        {apiKey?.keyList && apiKey?.keyList.length > 0 &&
          < SettingTable
            variant={"api-keys"}
            rows={apiKey.keyList}
            columnNames={["name", "prefix", "created", "last_used", "actions"]}
          />
        }
        <Button variant="r4-primary" text="Generate new Key" onClick={() => setOpenCreate(!openCreate)} />
      </PageParagraph>
      <Modal
        title={apiKey.apiKey ? "Save your API Key" : "Create new API key"}
        open={openCreate}
        setOpen={setOpenCreate}
        subtitle={apiKey.apiKey && "Please save this key somewhere safe and accessible. For security reasons, you won’t be able to view it again through your account. If you lose this secret key, you’ll need to generate a new one."}
      >
        <CreateForm
          setShowForm={setOpenCreate}
          editingTrigger={editingTrigger}
        />
      </Modal>
      <Modal
        title={"Rename API key"}
        open={apiKey.editingKey}
        setOpen={setEditingKey}
      >
        <EditForm
          editingKey={apiKey.editingKey}
          setEditingKey={setEditingKey}
        />
      </Modal>
      <Modal
        title={"Revoke API key"}
        subtitle='This API key will be immediately revoked and disabled. API requests made made using this key will be rejected. Once revoked, you will no longer be able to view or modify this API key.'
        open={apiKey.deletingKey}
        setOpen={setDeletingKey}
      >
        <DeleteForm
          deletingKey={apiKey.deletingKey}
          setDeletingKey={setDeletingKey}
        />
      </Modal>
    </PageContent>
  )
}



export default connect(mapStateToProps, mapDispatchToProps)(ApiKeyPage)

