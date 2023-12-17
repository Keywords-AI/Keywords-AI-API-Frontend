import React from 'react'

const RadioIcon = ({ selected, setSelected, handleSelected }) => {
    return (
        <div
            onClick={() => { handleSelected(); setSelected(!selected) }}
            className={`flex w-sm h-sm rounded-sm flex-shrink-0 justify-center items-center border border-gray-4`}
        >
            {selected && <div className="w-xxs h-xxs bg-gray-white flex-shrink-0"></div>}
        </div>
    )

}
export default function RadioInput({ register = () => { }, name, validationSchema, handleSelected = () => { }, text }) {
    const [checked, setChecked] = React.useState();
    return (
        <div className="flex-row gap-xxs items-center">
            <input {...register(name, validationSchema)} type="radio" checked={checked} hidden className="hidden" />
            <RadioIcon selected={checked} setSelected={setChecked} handleSelected={handleSelected} />
            {text && <div className="text-sm text-gray-4">{text}</div>}
        </div>
    )
}
