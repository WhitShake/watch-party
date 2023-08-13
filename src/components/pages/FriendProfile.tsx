import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserData, getFriendsList } from '../../firestore_functions/firestore_calls';
import './FriendProfile.css'
import { UserProfileData } from '../prop_types/propsTypes';

export const FriendPage = () => {
    const { id } = useParams(); 
    const [userData, setUserData] = useState<UserProfileData>();
    const [friendsData, setFriendsData] = useState<UserProfileData[]>();


    const fetchUserData = () => {
        if (id) {
            getUserData(id)
            .then(data => setUserData(data as UserProfileData));

            getFriendsList(id)
            .then(async friendsObject => {
                if (!friendsObject) return;
                const friendsIds = Object.keys(friendsObject)
                const friendsDataPromises = friendsIds.map(async friendId => {
                    const toAdd = await getUserData(friendId);
                    return {
                        ...toAdd as UserProfileData,
                        id: friendId,
                    };
                });
                const friendsInfo = await Promise.all(friendsDataPromises);
                setFriendsData(friendsInfo as UserProfileData[])
            });
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [id])


    return (
        <h2>{userData?.firstName}</h2>

        // <div className="profile-info">
        //         <Picture urlPath={profilePic} handleUpdate={props.handleUpdate}/>
        //         <div className="user-info">
        //             <h1 className="name">
        //                 <EditableText text={firstName} field="firstName" handleUpdate={handleUpdate}/>
        //                 <EditableText text={lastName} field="lastName" handleUpdate={handleUpdate}/>
        //             </h1>
        //             <h4 className="quote">
        //                 <EditableText text={quote} field="quote" handleUpdate={handleUpdate}/>
        //             </h4>
        //         </div>
        //     </div>
        // {/* <div className="watched-and-friends"> */}
        //     <div>
        //     <h4>Recently Watched</h4>
        //     </div>
        //     <div className="watched-list">
        //         <ProfileWatched movies={watchedMovies}/>
        //         {/* {props.watchedMovies.length === 0 
        //         ? <p className="text">Movies you watch will show up here!</p>
        //         : <MovieList movies={props.watchedMovies}/>
        //         } */}
        //     </div>
        //     <div className="friends-list">
        //         <h4>Friends List</h4>
        //         {props.friendsData.length === 0
        //         ? <p className="text">Add friends and invite them to watch a movie!</p>
        //         : <FriendsList friendsData={friendsData} friendsList={friendsList} setFriendsList={setFriendsList} setFriendsData={setFriendsData}/>
        //         }
        //     </div>



    )
}