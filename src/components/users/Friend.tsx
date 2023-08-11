import './Friend.css'

type FriendProps = { 
    id: string 
    profilePic: string
    email: string
}

export const Friend = ({profilePic}: FriendProps)  => {
    return (
        <div className="friend">
            <img className="friend-card" alt="avatar" src={profilePic === null 
                ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'
                : profilePic} />
        </div>
    )
}

