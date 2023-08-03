import React from 'react';
import { MovieList } from '../movie_data/MovieList';
import { FriendsList } from '../users/FriendsList'
import './Profile.css'

type ProfileProps = {
    userData: {
        firstName: string
        lastName: string
        image: string
        quote: string
        recentlyWatched: string[]
        friendsList: string[]
    }
}

export const Profile = (props: ProfileProps) => {
    const {firstName, lastName, image, quote, recentlyWatched, friendsList} = props.userData
    return (
    <div>
        <div>
            <img src={image} alt="avatar" className="avatar"/>
            <h1>{firstName} {lastName}</h1>
            <h4>{quote}</h4>
        </div>
        <div>
            <h4>Recently Watched</h4>
            <MovieList movies={recentlyWatched}/>
        </div>
        <div>
            <h4>Friends List</h4>
            <FriendsList friends={friendsList}/>
        </div>

    </div>)
};