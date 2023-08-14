import { db } from "../firebase_setup/firebase"
import { doc, getDoc, setDoc, collection, getDocs, updateDoc, where, query, deleteDoc, arrayUnion, getDocFromServer, arrayRemove } from "firebase/firestore"
import { MovieProps, UserData, UserProfileData } from "../components/prop_types/propsTypes"
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { v4 } from "uuid"
import { storage } from "../firebase_setup/firebase";

export const initializeNewUser = async (userId: string, displayName: string | null, email: string | null) => {
    const userDocRef = doc(db, 'users', userId)
    const userDocSnapshot = await getDoc(userDocRef)
    if (!userDocSnapshot.exists()) {
        let name;
        if (displayName) {
            name = displayName.split(" ", 2)
        } else {
            name = ["First Name", "Last Name"]
        }
        const defaultData = {
            email: email,
            firstName: name[0],
            lastName: name[1],
            profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSshtD-7RtqN_oJMs3UfPKF7SQaUDHZjkuQoA&usqp=CAU",
            quote: "Add your favorite movie quote here!"
        }
        setDoc(userDocRef, defaultData)

        const watchedDocRef = doc(db, 'users', userId, 'Shelf', 'Watched')
        setDoc(watchedDocRef, {movies: []})
    }
}


export const getUserData = async (userId: string) => {
    const userDocRef = doc(db, 'users', userId);

    try {
        const docUserData = await getDoc(userDocRef);
        if (docUserData.exists()) {
            return docUserData.data()
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; 
    }
};


export const getFriendsList = async (userId: string | undefined) => {
    if (!userId) return;
    const friendsRef = collection(db, 'users', userId, 'Friends');
    try {
        const userFriendsList = await getDocs(friendsRef);
        let friends: {} = {}
        userFriendsList.forEach(friend => {
            friends = {...friends, [friend.id]: 1}
        })
        return friends;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}


export const addFriend = async (userId: string, idToAdd: string) => {
    try { 
        const friendToAddRef = doc(db, 'users', userId, 'Friends', idToAdd)
        await setDoc(friendToAddRef, {exists: true})
        
        const userRef = doc(db, 'users', idToAdd, 'Friends', userId)
        await setDoc(userRef, {exists: true})
    } catch (error) { 
        console.log("Issue with adding friend")
        throw error;
    }
}


export const deleteFriend = async (userId: string, idToDelete: string) => {
    try {
        const docToDelete = doc(db, 'users', userId, 'Friends', idToDelete)
        await deleteDoc(docToDelete)
        const userDoc = doc(db, 'users', idToDelete, 'Friends', userId)
        await deleteDoc(userDoc)
    } catch (error) {
        throw error;
    }
}



export const fetchPlaylistMovies = async (userId: string | null, playlistTitle: string) => {
    if (!userId) return;
    const playlistRef = doc(db, 'users', userId, 'Shelf', playlistTitle);
    
    try {
        const playlistMovies = await getDocFromServer(playlistRef)
        if (playlistMovies.exists()) {
            return playlistMovies.data()
        }  else{
            throw new Error('Error fetching the playlist');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}


export const fetchShelf = async (userId: string) => {
    const shelfRef = collection(db, 'users', userId, 'Shelf')
    const shelfDocs = await getDocs(shelfRef)
    let playlists: string[] = []
    shelfDocs.forEach(playlist => {
        playlists.push(playlist.id)
    })
    return playlists  
}


export const addMovieToPlaylist = async (userId: string | undefined, playlistTitle: string, movie: MovieProps) => {
    if (!userId) return;
    const playlistDocRef = doc(db, 'users', userId, 'Shelf', playlistTitle);
    await updateDoc(playlistDocRef, {
        movies: arrayUnion(movie)
    })
}


export const deleteMovieOffPlaylist = async (userId: string | undefined, playlistTitle: string, movie: MovieProps) => {
    if (!userId) return;
    const playlistDocRef = doc(db, 'users', userId, 'Shelf', playlistTitle)
    await updateDoc(playlistDocRef, {
        movies: arrayRemove(movie)
    })
}

export const addShelfPlaylist = async (userId: string | null | undefined, title: string) => {
    if (userId) {
        const playlistDocRef = doc(db, 'users', userId, 'Shelf', title)
        await setDoc(playlistDocRef, {movies: []})
    } else {
        console.log("Issue with validating user")
    }
}


export const deleteShelfPlaylist = async (userId:string, title: string) => {
    try {
        const playlistToDelete = doc(db, 'users', userId, 'Shelf', title)
        await deleteDoc(playlistToDelete)
    } catch (error) {
        throw error;
    }
}



export const updateUserDoc = async (userId: string, value: string, field: keyof UserProfileData) => {
    const userDocRef = doc(db, 'users', userId)
    const userDocSnapshot = await getDoc(userDocRef)
    if (userDocSnapshot.exists()) {
        console.log("value:", value)
        const data = userDocSnapshot.data()
        console.log("current data:", data)
        updateDoc(userDocRef, {
            [field]: value
        })
    }
}


export const uploadImage = async (imageUpload: File | null, userId: string) => {
    if (imageUpload === null) {
        alert("Must upload .jpg, .jpeg, or .png");
        return;
    };
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    const imageSnapshot = await uploadBytes(imageRef, imageUpload)
    const url = await getDownloadURL(imageSnapshot.ref)
    updateUserDoc(userId, url, "profilePic")
    return url
}


export const searchUsersByName = async (firstName: string, lastName: string) => {
    const usersRef = collection(db, "users");
    const userQuery = query(
        usersRef,
        where("firstName", "==", firstName),
        where("lastName", "==", lastName)
    );
    try {
        const querySnapshot = await getDocs(userQuery)
        let usersSearchResults: UserData[] = [];
        querySnapshot.forEach(doc => {
            const userData = doc.data() as UserData;
            usersSearchResults.push({...userData, id: doc.id})
        });
        return usersSearchResults;
    } catch (error) {
        console.error("Issue with fetching users");
        return error;
    };
};

