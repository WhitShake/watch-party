import { watch } from "fs"
import { db } from "../firebase_setup/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"


export const initializeNewUser = async (userId: string) => {
    const userDocRef = doc(db, 'users', userId)
    const userDocSnapshot = await getDoc(userDocRef)
    if (!userDocSnapshot.exists()) {
        const defaultData = {
            firstName: "",
            lastName: "",
            profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSshtD-7RtqN_oJMs3UfPKF7SQaUDHZjkuQoA&usqp=CAU",
            quote: "Add your favorite movie quote here!"
        }
        setDoc(userDocRef, defaultData)

        const watchedDocRef = doc(db, 'users', userId, 'Shelf', 'Watched')
        setDoc(watchedDocRef, {movies: []})

        const friendsDocRef = doc(db, 'users', userId, 'Friends', 'Friends List');
        setDoc(friendsDocRef, {friends: []})

        console.log("User successfully added")
    }
    else {
        console.log("User already exists!")
        console.log(userDocSnapshot.data())
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
                    profilePic: data.profilePic as string
                }
            }
            return null; 
        })
    );
    return friendData
}

export const fetchWatchedMovies = async (userId: string) => {
    const watchedRef = doc(db, 'users', userId, 'Shelf', 'Watched');
    
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


