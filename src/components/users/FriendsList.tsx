import { Friend } from './Friend'
import { FriendsListProps } from '../prop_types/propsTypes'
import './FriendsList.css'

export const FriendsList = ({ friendsData, friendsList, setFriendsList, setFriendsData, setMatchingUsers }: FriendsListProps) => {

    // if (!friendsList) {
    //     return <div>Log in to see your friends here</div>
    // }

    return (
        <div className="friend-display">
            {friendsData.map((friend, index) => (
                <Friend key={index} data={friend} friendsList={friendsList} setFriendsList={setFriendsList} setFriendsData={setFriendsData} setMatchingUsers={setMatchingUsers}/>
            ))} 
        </div>         
    )
}
