import React, { useState, useEffect } from 'react';
import { uploadImage } from '../../firestore_functions/firestore_calls';
import { auth } from '../../firebase_setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserProfileData } from '../prop_types/propsTypes';
import './Picture.css'

type PictureProps = {
    urlPath: string
    handleUpdate: (field: keyof UserProfileData, value: string) => void
}

export const Picture = ({urlPath, handleUpdate}: PictureProps) => { 
    const [user] = useAuthState(auth);
    const [file, setFile] = useState<File | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files)
        setFile(event.target.files[0])
    }

    const handleClick = async () => {
        if (file && user) {
            const url = await uploadImage(file, user.uid)
            handleUpdate("profilePic", url as string)
        }
    }


    return (
        <div className="picture"> 
            <img src={urlPath} alt="avatar" className="avatar"/>
            { menuOpen && (
                <div className="file-buttons">
                    <input 
                        className="image-button"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleChange}
                    />
                    <button className="upload-button" onClick={handleClick}>
                    Upload Image
                    </button>
                </div>
            )}
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close Menu" : "Open Menu"}</button>
        </div>
    )
}

