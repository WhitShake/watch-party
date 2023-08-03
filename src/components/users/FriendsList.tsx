import { Friend } from './Friend'

type FriendsListProps = { friends : string[] }

export const FriendsList = (props : FriendsListProps) => {
    return (
        <div className="friend display">
               {props.friends.map((friend, index) => (
                  <Friend key={index} friend={friend} />
              ))}           
        </div>
    )
}