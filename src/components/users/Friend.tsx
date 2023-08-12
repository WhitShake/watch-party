import { UserProfileData } from '../prop_types/propsTypes'
import { getFriendsList } from '../../firestore_functions/firestore_calls'
import { auth } from '../../firebase_setup/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import './Friend.css'


type FriendProps = {
    data: UserProfileData
}

export const Friend = ({data}: FriendProps)  => {
    const [user] = useAuthState(auth);

    

// have an add friend, delete friend, view profile button 
// render view profile for everyone 
// add friend if id not in friendslist
// delete friend if friend in friendslist 




    const addFriend = async () => {

    }


    return (
        <div className="friend">
            <img className="friend-card" alt="avatar" src={data.profilePic === null 
                ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'
                : data.profilePic} />
            <p>{data.firstName} {data.lastName}</p>
        </div>
    )
}

