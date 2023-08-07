import { db } from "../firebase_setup/firebase"
import { doc, getDoc } from "firebase/firestore"


export const getUserData = async (username: string) => {
    const userDocRef = doc(db, 'users', username);

    try {
        const docUserData = await getDoc(userDocRef);
        if (docUserData.exists()) {
            return { userData: docUserData.data() }
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
            return { friends: userFriendsList.data()}
        } else{
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

