import { db } from "../firebase_setup/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"


export const initializeNewUser = async (userId: string) => {
    const userDocRef = doc(db, 'users', userId)
    const userDocSnapshot = await getDoc(userDocRef)
    if (!userDocSnapshot.exists()) {
        const defaultData = {
            firstName: "",
            lastName: "",
            profilePic: "https://cdn.vectorstock.com/i/1000x1000/21/23/avatar-photo-default-user-icon-person-image-vector-47852123.webp",
            quote: "Add your favorite movie quote here!"
        }
        setDoc(userDocRef, defaultData)
        console.log("User successfully added")
    }
    else {
        console.log(userDocSnapshot.data())
    }

}




export const getUserData = async (username: string) => {
    const userDocRef = doc(db, 'users', username);

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


export const getFriendsList = async (username: string) => {
    const userFriendsRef = doc(db, 'users', username, 'Friends', 'Friends List');

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
                    profilePic: data.profilePic as string
                }
            }
            return null; 
        })
    );
    return friendData
}

export const fetchWatchedMovies = async (username: string) => {
    const watchedRef = doc(db, 'users', username, 'Shelf', 'Watched');
    
    try {
        const watchedMoviesList = await getDoc(watchedRef);
        if (watchedMoviesList.exists()) {
            return watchedMoviesList.data()
        }  else{
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}


