import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addFriend, deleteFriend} from '../../firestore_functions/firestore_calls'
import { getUserData, getFriendsList, fetchPlaylistMovies } from '../../firestore_functions/firestore_calls';
import './FriendPage.css'
import { FriendPageProps, MovieProps, UserProfileData } from '../prop_types/propsTypes';
import { ProfileWatched } from '../movie_data/ProfileWatched';
import { FriendsList } from '../users/FriendsList';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase_setup/firebase';
import { Email } from '../users/Email';

export const FriendPage = (props: FriendPageProps) => {
    const { id } = useParams(); 
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserProfileData>();
    const [userFriendsData, setUserFriendsData] = useState<UserProfileData[]>([]);
    const [recentlyWatched, setRecentlyWatched] = useState<MovieProps[]>([])

    if (id === user?.uid) {
        navigate("/profile")
    }


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
                setUserFriendsData(friendsInfo as UserProfileData[])
            });

            fetchPlaylistMovies(id, "Watched")
            .then(data => {
                if (data && data.movies) {
                    const movies = data.movies;
                    let recentlyWatchedMovies: MovieProps[] = []
                    for (let i = movies.length - 1; i >= Math.max(movies.length - 10, 0); i--) {
                        recentlyWatchedMovies.push(movies[i])
                    }
                    setRecentlyWatched(recentlyWatchedMovies)
                }
            })
        }
    }

    const handleAddFriend = async () => {
        if (user && id) {
            addFriend(user.uid, id)
            props.setFriendsList(prev => (
                {...prev,
                [id]: 1
                }
            ))
            const newFriend = await getUserData(id)
            props.setFriendsData(prev => (
                [...prev, {
                    ...newFriend as UserProfileData,
                    id: id
                }]
            ))
        }
    }

    const handleDeleteFriend = async () => {
        if (user && id) {
            deleteFriend(user.uid, id)
            props.setFriendsList(prev => {
                if(prev) {
                    const { [id]: _, ...updatedFriends } = prev
                    return updatedFriends
                }
                return prev
            })
            props.setFriendsData(prev => {
                const updatedFriends = prev.filter(person => person.id !== id)
                return updatedFriends
            })
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [id])


    return (
        <div className='user-profile'>
            <div className="user-profile-container">
                <div className="user-profile-info">
                    <img className="user-avatar" src={userData?.profilePic} alt="avatar"/>
                    <div className="user-friend-info">
                        <h1 className="user-friend-name">{userData?.firstName} {userData?.lastName}</h1>
                        <h4 className="user-friend-quote">{userData?.quote}</h4>
                    </div>
                    <div>
                    {user && ( 
                                props.friendsList && id && id in props.friendsList ? (
                                    <button onClick={handleDeleteFriend}>Delete Friend</button>
                                ) : (
                                    <button onClick={handleAddFriend}>Add Friend</button>
                                )
                                )}
                    </div>
                </div>
                <div className="invitation">
                    {user && props.currentUser && userData && <Email 
                                                    userData={props.currentUser} 
                                                    userEmail={user.email} friendEmail={userData.email} 
                                                    friendFirstName={userData.firstName} 
                                                    friendLastName={userData.lastName}
                                                    userId={user.uid}/>}
                </div>
                <div className='section-header'>
                <h4>Recently Watched</h4>
                <hr></hr>
                </div>
                <div className="watched-display">
                    {recentlyWatched.length === 0 
                    ? <p>This user has not watched any movies recently</p>
                    : <ProfileWatched movies={recentlyWatched} setRecentlyWatchedData={props.setRecentlyWatchedData}/>}
                </div>
                <div className="friends-list">
                <div className='section-header'>
                    <h4>Friends List</h4>
                    <hr></hr>
                    </div>
                    {userFriendsData.length === 0 
                    ? <p>This user has not added any friends yet</p>
                    : <FriendsList friendsData={userFriendsData} friendsList={props.friendsList} setFriendsList={props.setFriendsList} setFriendsData={props.setFriendsData} /> }
                    
                </div>
            </div>
        </div>
    )
}