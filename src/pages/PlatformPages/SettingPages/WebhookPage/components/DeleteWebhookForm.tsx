import React from 'react'
import { Button } from 'src/components/Buttons'
import { formProps } from 'src/types/form'
import { useTypedDispatch, useTypedSelector } from 'src/store/store'
import { deleteWebhook } from 'src/store/actions'

export function DeleteWebhookForm({
    handleClose = () => {},
}: formProps) {
    const dispatch = useTypedDispatch()
    const deleteingWebhook = useTypedSelector((state) => state.webhook.deletingWebhook)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (deleteingWebhook) {
            dispatch(deleteWebhook(deleteingWebhook))
        }
        handleClose();
    }
  return (
    <form
        className={"flex-col gap-sm self-stretch relative"}
        onSubmit={handleSubmit}
      >
        <div className="flex-row justify-end self-stretch">
          <div className="flex-row gap-xs">
            <Button
              variant="r4-gray-2"
              bgColor="transparent"
              text={"Cancel"}
              type="button"
              onClick={handleClose}
            />
            <Button variant="r4-red" text={"Delete"} />
          </div>
        </div>
      </form>
  )
}
