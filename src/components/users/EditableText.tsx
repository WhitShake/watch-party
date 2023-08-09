import React from 'react';
import EasyEdit, { Types } from 'react-easy-edit'

type EditableTextProps = {
    text: string
}

const save = (value: string) => {
    console.log(value)
}


export const EditableText = ({text}: EditableTextProps) => {
    return (
        <EasyEdit 
        type={Types.TEXT}
        onSave={save}
        value={text}
        />
    )

}