import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase_setup/firebase"
import { addShelfPlaylist } from "../../firestore_functions/firestore_calls"
import { Dispatch, SetStateAction, useState } from 'react'
import './AddPlaylistForm.css'

interface AddPlaylistFormData {
    title: string
}

type AddPlaylistFormProps = {
    setShelf: Dispatch<SetStateAction<string[]>>
}

export const AddPlaylistForm = ({ setShelf }: AddPlaylistFormProps) => {
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
            addShelfPlaylist(user?.uid, inputValue);
            setShelf(prevshelf => [...prevshelf, inputValue])
            setInputValue('')
        }).catch((err) => {
            console.log(err);
        });
    };


    return (
        <form className="playlist-form" onSubmit={handleSubmit}>
            <input className="playlist-field" placeholder="Add a playlist" {...register("title")} onChange={handleChange} value={inputValue}/>
            <input className="add-playlist-submit" type="submit" />
        </form>
    )
}