import React from 'react';
import EasyEdit, { Types } from 'react-easy-edit'
import { updateUserDoc } from '../../firestore_functions/firestore_calls';
import { auth } from '../../firebase_setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserProfileData } from '../prop_types/propsTypes';

type EditableTextProps = {
    text: string
    field: keyof UserProfileData
    handleUpdate: (field: keyof UserProfileData, value: string) => void
}

export const EditableText = ({text, field, handleUpdate}: EditableTextProps) => {
    const [user] = useAuthState(auth);

    const save = (value: string) => {
        if (user) {
            updateUserDoc(user.uid, value, field)
            handleUpdate(field, value)
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