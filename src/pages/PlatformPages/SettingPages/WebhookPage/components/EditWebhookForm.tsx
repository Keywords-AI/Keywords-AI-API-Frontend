import React, {useState, useEffect} from 'react'
import { Button } from 'src/components/Buttons'
import { TextInput } from 'src/components/Inputs'
import { useForm } from 'react-hook-form'
import { useTypedDispatch, useTypedSelector } from 'src/store/store'

export function EditWebhookForm() {

  return (
    <form>
        <TextInput title="Name" />
        <TextInput title="URL" />
        <Button>Create</Button>
    </form>
  )
}
