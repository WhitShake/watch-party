import React from 'react';
import { MovieList } from '../movie_data/MovieList';
import { FriendsList } from './FriendsList'
import { ProfileProps } from '../prop_types/propsTypes';
import { auth } from '../../firebase_setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { EditableText } from './EditableText';
import { Picture } from './Picture';

import './Profile.css'
import { profile } from 'console';


export const Profile = (props: ProfileProps) => {

    const [user] = useAuthState(auth);

    if (!props.userData) {
        return (<div className="profile">Log in to see your profile!</div>)
    }

    const {firstName, lastName, profilePic, quote} = props.userData

    return (
    <div className="profile">
        <div className="profile-info">
            <Picture urlPath={profilePic} handleUpdate={props.handleUpdate}/>
            <div className="user-info">
                <h1 className="name">
                    <EditableText text={firstName} field="firstName" handleUpdate={props.handleUpdate}/>
                    <EditableText text={lastName} field="lastName" handleUpdate={props.handleUpdate}/>
                </h1>
                <h4 className="quote">
                    <EditableText text={quote} field="quote" handleUpdate={props.handleUpdate}/>
                </h4>
            </div>
        </div>
        <div className="watched-and-friends">
            <div>
                <h4>Recently Watched</h4>
                {props.watchedMovies.length === 0 
                ? <p className="text">Movies you watch will show up here!</p>
                : <MovieList movies={props.watchedMovies}/>
                }
            </div>
            <div>
                <h4>Friends List</h4>
                {props.friends?.length === 0
                ? <p className="text">Add friends and invite them to watch a movie!</p>
                : <FriendsList friends={props.friends}/>
                }
            </div>
        </div>
    </div>)
};