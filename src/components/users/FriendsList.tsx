import { Friend } from './Friend'
import { FriendsListProps } from '../prop_types/propsTypes'

export const FriendsList = (props : FriendsListProps) => {
    return (
        <div className="friend display">
            {props.friends.map((friend, index) => (
                <Friend key={index} friend={friend} />
            ))}           
        </div>
    )
}