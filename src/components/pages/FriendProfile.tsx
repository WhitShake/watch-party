import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserData, getFriendsList, fetchPlaylistMovies } from '../../firestore_functions/firestore_calls';
import './FriendProfile.css'
import { FriendPageProps, MovieProps, UserProfileData } from '../prop_types/propsTypes';
import { ProfileWatched } from '../movie_data/ProfileWatched';
import { FriendsList } from '../users/FriendsList';


export const FriendPage = (props: FriendPageProps) => {
    const { id } = useParams(); 
    const [userData, setUserData] = useState<UserProfileData>();
    const [userFriendsData, setUserFriendsData] = useState<UserProfileData[]>([]);
    const [recentlyWatched, setRecentlyWatched] = useState<MovieProps[]>([])


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
                </div>
                <div className='section-header'>
                <h4>Recently Watched</h4>
                <hr></hr>
                </div>
                <div className="watched-display">
                    {recentlyWatched.length === 0 
                    ? <p>This user has not watched any movies recently</p>
                    : <ProfileWatched movies={recentlyWatched} />}
                </div>
                <div className="friends-list">
                <div className='section-header'>
                    <h4>Friends List</h4>
                    <hr></hr>
                    </div>
                    {userFriendsData.length === 0 
                    ? <p>This user has not added any friends yet</p>
                    : <FriendsList friendsData={userFriendsData} friendsList={props.friendsList} setFriendsList={props.setFriendsList} setFriendsData={props.setFriendsData}/> }
                    
                </div>
            </div>
        </div>
    )
}