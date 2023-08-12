import React from 'react';
import './Friend.css'

type FriendProps = { 
    id: string 
    profilePic: string
}

export const Friend = ({profilePic}: FriendProps)  => {
    return (
        <div className="friend">
            <img className="friend-card" src={profilePic === null 
                ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'
                : profilePic} alt='profile pic' />
        </div>
    )
}

