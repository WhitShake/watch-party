import { Friend } from './Friend'
import { FriendsListProps } from '../prop_types/propsTypes'
import './FriendsList.css'

export const FriendsList = ({ friends }: FriendsListProps) => {

    if (!friends) {
        return <div>Log in to see your friends here</div>
    }

    return (
        <div>
            <div className="friend-display">
                {friends.map((friend, index) => (
                    <Friend key={index} id={friend.id} profilePic={friend.profilePic} email={friend.email}/>
                ))}           
            </div>         
        </div>
    )
}

