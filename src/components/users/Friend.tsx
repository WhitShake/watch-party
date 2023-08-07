type FriendProps = { 
    id: string 
    profilePic: string
}

export const Friend = ({profilePic}: FriendProps)  => {
    // return (
    //     <div className="friend">
    //         {props.id}
    //         {props.profilePic}
    //     </div>
    // )
    return (
        <div className="friend">
            {/* {profilePic === null 
            ? <img src={'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'} alt="friend" className="default"/> 
            : <img src={profilePic} alt="friend"/>} */}
            <img src={profilePic === null ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg': profilePic} />
        </div>
    )
}

