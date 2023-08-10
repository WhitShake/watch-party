import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase_setup/firebase';
import { v4 } from 'uuid';
import { uploadImage } from '../../firestore_functions/firestore_calls';
import { auth } from '../../firebase_setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { userProfileData } from '../prop_types/propsTypes';

type PictureProps = {
    urlPath: string
    handleUpdate: (field: keyof userProfileData, value: string) => void
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
        <div> 
            <img src={urlPath} alt="avatar" className="avatar"/>
            { menuOpen && (
                <div>
                    <input 
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleChange}
                    />
                    <button onClick={handleClick}>
                    Upload Image
                    </button>
                </div>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)}>Open Menu</button>
        </div>
    )
}

