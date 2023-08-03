type FriendProps = { friend: string }

export const Friend = (props:FriendProps)  => {
    return (
        <div className="friend">
            {props.friend}
        </div>
    )
}