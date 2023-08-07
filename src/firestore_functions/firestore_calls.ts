import { db } from "../firebase_setup/firebase"
import { doc, getDoc } from "firebase/firestore"


export const getUserData = async (username: string) => {
    const userDocRef = doc(db, 'users', username);

    try {
        const docUserData = await getDoc(userDocRef);
        if (docUserData.exists()) {
            return (
                {
                    userData: docUserData.data()
                }
            )
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; 
    }
};






// const elizabethRef = doc(db, 'users', 'elizabeth123')
// const elizabethData = await getDoc(elizabethRef)
// console.log("data", elizabethData.data())



// console.log(elizabethDoc.data())
// const elizabethData = {
//   userData: elizabethDoc.data()
// }