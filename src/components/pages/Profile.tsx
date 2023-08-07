import React from 'react';
import { MovieList } from '../movie_data/MovieList';
import { FriendsList } from '../users/FriendsList'
import { ProfileProps } from './Profile.types';
import './Profile.css'


export const Profile = (props: ProfileProps) => {

    if (!props.userData) {
        return (<div>Log in to see your profile!</div>)
    }

    const {firstName, lastName, profilePic, quote} = props.userData

    return (
    <div className="profile">
        <div>
            <img src={profilePic} alt="avatar" className="avatar"/>
            <h1>{firstName} {lastName}</h1>
            <h4>{quote}</h4>
        </div>
        <div>
            <h4>Recently Watched</h4>
            {/* <MovieList movies={recentlyWatched}/> */}
        </div>
        <div>
            <h4>Friends List</h4>
            {/* <FriendsList friends={friendsList}/> */}
        </div>

    </div>)
};