import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase_setup/firebase"
import { addShelfPlaylist } from "../../firestore_functions/firestore_calls"
import { useState } from 'react'

interface AddPlaylistFormData {
    title: string
}

type AddPlaylistFormProps = {
    handleAddPlaylist: (newPlaylist: string) => void
}

export const AddPlaylistForm = ({handleAddPlaylist}: AddPlaylistFormProps) => {
    const [user] = useAuthState(auth)
    const [inputValue, setInputValue] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }


    const schema = yup.object().shape({
        title: yup.string().required("You must include a playlist title")
    })

    const { register, formState: {errors} } = useForm<AddPlaylistFormData>({
        resolver: yupResolver(schema)
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputValue === '') {
            alert("You must include a title") 
            return;
        }
        schema.validate({ title: inputValue }).then(() => {
            addShelfPlaylist(user?.uid, inputValue, handleAddPlaylist);
            setInputValue('')
        }).catch((err) => {
            console.log(err);
        });
    };


    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Add a playlist" {...register("title")} onChange={handleChange} value={inputValue}/>
            <p style={{color: "red"}}>{errors.title?.message}</p>
            <input type="submit" />
        </form>
    )
}