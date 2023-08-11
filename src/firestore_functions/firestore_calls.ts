import { watch } from "fs"
import { db } from "../firebase_setup/firebase"
import { doc, getDoc, setDoc, collection, getDocs, updateDoc, where, query } from "firebase/firestore"
import { MovieProps, UserData } from "../components/prop_types/propsTypes"
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

        const friendsDocRef = doc(db, 'users', userId, 'Friends', 'Friends List');
        setDoc(friendsDocRef, {friends: []})
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


export const getFriendsList = async (userId: string) => {
    const userFriendsRef = doc(db, 'users', userId, 'Friends', 'Friends List');

    try {
        const userFriendsList = await getDoc(userFriendsRef);
        if (userFriendsList.exists()) {
            return userFriendsList.data()
        } else{
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}


export const fetchFriendData = async (friends: string[]) => {
    const friendData = await Promise.all(
        friends.map(async (friend: string) => {
            const data = await getUserData(friend);
            if (data) {
                return {
                    id: friend,
                    profilePic: data.profilePic as string,
                    email: data.email
                }
            }
            return null; 
        })
    );
    console.log(friendData)
    return friendData
}

export const fetchPlaylistMovies = async (userId: string | null, playlistTitle: string) => {
    if (!userId) return;
    const watchedRef = doc(db, 'users', userId, 'Shelf', playlistTitle);
    
    try {
        const playlistMovies = await getDoc(watchedRef);
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
// userDocs.forEach(user => {
//     playlistsToAdd.forEach(playlist => {
//         const playlistDocRef = doc(db, 'users', user.id, 'Shelf', playlist.title)
//         setDoc(playlistDocRef, playlist.movieObject)
//         .then(() => {
//             console.log(`Added ${playlist.title} to Shelf, contains ${playlist.movieObject}`)
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     })
// })





export const handleAddMovie = (movie: MovieProps) => {
    console.log(movie)
}


export const addShelfPlaylist = async (userId: string | null | undefined, title: string, updateState: (title: string) => void) => {
    if (userId) {
        const playlistDocRef = doc(db, 'users', userId, 'Shelf', title)
        await setDoc(playlistDocRef, {movies: []})
        updateState(title)
    } else {
        console.log("Issue with validating user")
    }
}

export const updateUserDoc = async (userId: string, value: string, field: string) => {
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


// export const searchForUser = async (firstName: string, lastName: string) => {
//     const usersRef = collection(db, "users")
//     const userQuery = query(
//         usersRef,
//         where("firstName", "==", firstName),
//         where("lastName", "==", lastName)
//     )
//     try {
//         const querySnapshot = await getDocs(userQuery)
//         let usersSearchResults: UserData[] = []


//     }
// }


