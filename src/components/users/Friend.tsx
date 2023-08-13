import { UserProfileData } from '../prop_types/propsTypes'
import { addFriend, deleteFriend } from '../../firestore_functions/firestore_calls'
import { auth } from '../../firebase_setup/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import './Friend.css'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getUserData } from '../../firestore_functions/firestore_calls'
import { FriendsList } from './FriendsList'
import { Link, useParams } from 'react-router-dom'


type FriendProps = {
    data: UserProfileData
    friendsList: {} | undefined
    setFriendsList: Dispatch<SetStateAction<Record<string, any> | undefined>>
    setFriendsData: Dispatch<SetStateAction<UserProfileData[]>>
    setMatchingUsers?: Dispatch<SetStateAction<UserProfileData[]>>
}

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
    
    if (!user) return <div>Please sign in to use this feature</div>
    if (!friendsList) return <div>User has no friends</div>

    const handleAddFriend = async () => {
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
        deleteFriend(user?.uid, data.id)
        setFriendsList(prev => {
            if(prev) {
                const { [data.id]: _, ...updatedFriends } = prev
                return updatedFriends
            }
            return prev
        })
        setFriendsData(prev => {
            const updatedFriends = prev.filter(person => person.id != data.id)
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
                    <Link to= {`/friend-details/${data.id}`}>View {data.firstName}'s Profile</Link>
                    {friendStatus
                    ? <button onClick={handleDeleteFriend}>Delete Friend</button>
                    : <button onClick={handleAddFriend}>Add Friend</button>} 
                </div>
            </div>
            <img className="friend-card" alt="avatar" src={data.profilePic === null 
                ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'
                : data.profilePic} />
            <p>{data.firstName} {data.lastName}</p>
        </div>
    )
}

