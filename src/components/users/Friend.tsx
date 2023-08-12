import { UserProfileData } from '../prop_types/propsTypes'
import { addFriend, deleteFriend } from '../../firestore_functions/firestore_calls'
import { auth } from '../../firebase_setup/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import './Friend.css'


type FriendProps = {
    data: UserProfileData
    friendsList: {} | undefined
}

export const Friend = ({data, friendsList}: FriendProps)  => {
    const [user] = useAuthState(auth);
    if (!user) return <div>Please sign in to use this feature</div>
    if (!friendsList) return <div>User has no friends</div>



// have an add friend, delete friend, view profile button 
// render view profile for everyone 
// add friend if id not in friendslist
// delete friend if friend in friendslist 
// may need to update friendsList state -- pass setFriendsList all the way down for re-render of friends 
    return (
        <div className="friend">
            <img className="friend-card" alt="avatar" src={data.profilePic === null 
                ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'
                : data.profilePic} />
            <p>{data.firstName} {data.lastName}</p>
            {data.id in friendsList
            ? <button onClick={() => deleteFriend(user?.uid, data.id)}>Delete Friend</button>
            : <button onClick={() => addFriend(user?.uid, data.id)}>Add Friend</button>}   


            {/* <button onClick={() => addFriend(user?.uid, data.id)}>Add Friend</button>
            <button onClick={() => deleteFriend(user?.uid, data.id)}>Delete Friend</button> */}
        </div>
    )
}

