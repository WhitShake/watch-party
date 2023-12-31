import { FriendProps, UserProfileData } from '../prop_types/propsTypes'
import { addFriend, deleteFriend } from '../../firestore_functions/firestore_calls'
import { auth } from '../../firebase_setup/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import './Friend.css'
import { useEffect, useState } from 'react'
import { getUserData } from '../../firestore_functions/firestore_calls'
import { Link } from 'react-router-dom'


export const Friend = ({data, friendsList, setFriendsList, setFriendsData}: FriendProps)  => {
    const [user] = useAuthState(auth);
    const [friendStatus, setFriendStatus] = useState(true)
    
    useEffect(() => {
        if (friendsList && data.id in friendsList) {
            setFriendStatus(true)
        } else {
            setFriendStatus(false)
        }
    }, [data.id, friendsList])

    if (!friendsList) return <div>User has no friends</div>

    const handleAddFriend = async () => {
        if (!user) return;
        addFriend(user?.uid, data.id)
        setFriendsList(prev => (
            {...prev,
            [data.id]: 1
            }
        ))
        const newFriend = await getUserData(data.id)
        setFriendsData(prev => (
            [...prev, {
                ...newFriend as UserProfileData,
                id: data.id
            }]
        ))
    }

    const handleDeleteFriend = async () => {
        if (!user) return;
        deleteFriend(user?.uid, data.id)
        setFriendsList(prev => {
            if(prev) {
                const { [data.id]: _, ...updatedFriends } = prev
                return updatedFriends
            }
            return prev
        })
        setFriendsData(prev => {
            const updatedFriends = prev.filter(person => person.id !== data.id)
            return updatedFriends
        })
    }

    return (
        <div className="friend">
            <div className="dropdown">
                <div className="dropdown-button">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="dropdown-content">
                    <Link to= {`/friend-details/${data.id}`} className='view-profile'>View {data.firstName}'s Profile</Link>
                    {friendStatus
                    ? <button onClick={handleDeleteFriend}>Delete Friend</button>
                    : <button onClick={handleAddFriend}>Add Friend</button>} 
                </div>
            </div>
                <img className="friend-avatar" alt="avatar" src={data.profilePic === null 
                    ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'
                    : data.profilePic} />
                <p className="friend-name">{data.firstName} {data.lastName}</p>
        </div>
    )
}

