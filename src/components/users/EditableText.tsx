import React from 'react';
import EasyEdit, { Types } from 'react-easy-edit'
import { updateUserDoc } from '../../firestore_functions/firestore_calls';
import { auth } from '../../firebase_setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

type EditableTextProps = {
    text: string
    field: string
}



export const EditableText = ({text, field}: EditableTextProps) => {
    const [user] = useAuthState(auth);

    const save = (value: string) => {
        if (user) {
            updateUserDoc(user.uid, value, field)
        }
    }
    
    return (
        <EasyEdit 
        type={Types.TEXT}
        onSave={save}
        value={text}
        />
    )

}