import React from 'react';
import { MovieList } from '../movie_data/MovieList';
import { FriendsList } from './FriendsList'
import { ProfileProps } from '../prop_types/propsTypes';
import { auth } from '../../firebase_setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import './Profile.css'


export const Profile = (props: ProfileProps) => {

    const [user] = useAuthState(auth);

    if (!props.userData) {
        return (<div className="profile">Log in to see your profile!</div>)
    }

    const {firstName, lastName, profilePic, quote} = props.userData

    return (
    <div className="profile">
        <div className="profile-info">
            <img src={profilePic} alt="avatar" className="avatar"/>
            <div className="user-info">
                <h1 className="name">{firstName} {lastName}</h1>
                <h4 className="quote">"{quote}"</h4>
            </div>
        </div>
        <div className="watched-and-friends">
            <div>
                <h4>Recently Watched</h4>
                <MovieList movies={props.watchedMovies}/>
            </div>
            <div>
                <h4>Friends List</h4>
                <FriendsList friends={props.friends}/>
            </div>
        </div>
    </div>)
};