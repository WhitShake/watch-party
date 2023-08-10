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

    return (
        <div> 
            <img src={urlPath} alt="avatar" className="avatar"/>
            { menuOpen && (
                <div>
                    <input 
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={event => {
                            if (event.target.files)
                            setFile(event.target.files[0])
                        }}
                    />
                    <button onClick={async () => {
                            if (file && user) {
                                const url = await uploadImage(file, user.uid)
                                handleUpdate("profilePic", url as string)
                            }   
                        }}>
                    Upload Image
                    </button>
                </div>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)}>Open Menu</button>
        </div>
    )

    // {menuOpen && ( // Conditionally render the file input and button based on menuOpen state
    // //           <div>
    // //             <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
    // //             <button onClick={handleUploadImage}>Upload Image</button>
    // //           </div>
    // //         )}
    // //         <button onClick={() => setMenuOpen(!menuOpen)}>Open Menu</button>



}



// export const Picture = ({ urlPath, handleUpdate }: PictureProps) => {
//     const [user] = useAuthState(auth);
//     const [file, setFile] = useState<File | null>(null);
//     const [menuOpen, setMenuOpen] = useState(false); // Add state for the menu

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       if (event.target.files) setFile(event.target.files[0]);
//     };

//     const handleUploadImage = async () => {
//       if (file && user) {
//         const url = await uploadImage(file, user.uid);
//         handleUpdate("profilePic", url as string);
//       }
//     };

//     return (
//       <div>
//         <img src={urlPath} alt="avatar" className="avatar" />
//         {menuOpen && ( // Conditionally render the file input and button based on menuOpen state
//           <div>
//             <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
//             <button onClick={handleUploadImage}>Upload Image</button>
//           </div>
//         )}
//         <button onClick={() => setMenuOpen(!menuOpen)}>Open Menu</button>
//       </div>
//     );
//   };
