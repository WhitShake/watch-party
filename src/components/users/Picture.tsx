import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase_setup/firebase';
import { v4 } from 'uuid';
import { uploadImage } from '../../firestore_functions/firestore_calls';

type PictureProps = {
    urlPath: string
}

export const Picture = ({urlPath}: PictureProps) => { 

    return (
        <div> 
            <img src={urlPath} alt="avatar" className="avatar"/>
            <input 
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={event => {
                    if (event.target.files) uploadImage(event.target.files[0])
                }}
            />
            <button>Upload Image</button>
        </div>
    )
}

// export const uploadImage = async (imageUpload: File | null) => {
//     if (imageUpload === null) {
//         alert("Must upload .jpg, .jpeg, or .png");
//         return;
//     };
//     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

//     const imageSnapshot = await uploadBytes(imageRef, imageUpload)
//     const url = await getDownloadURL(imageSnapshot.ref)
//     return url
// }