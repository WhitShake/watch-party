import { FriendsList } from './FriendsList'
import { FriendSearch } from './FriendSearch';
import { ProfileProps, UserProfileData } from '../prop_types/propsTypes';
import { EditableText } from './EditableText';
import { Picture } from './Picture';
import { useState } from 'react';
import './Profile.css'
import { ProfileWatched } from '../movie_data/ProfileWatched';
import { searchUsersByName } from '../../firestore_functions/firestore_calls';


export const Profile = (props: ProfileProps) => {

    const [firstNameSearch, setFirstNameSearch] = useState('');
    const [lastNameSearch, setLastNameSearch] = useState('');
    const [matchingUsers, setMatchingUsers] = useState<UserProfileData[]>([]);
    

if (!props.userData) {
    return (<div className="profile">Log in to see your profile!</div>)
}

const {firstName, lastName, profilePic, quote, } = props.userData
const { handleUpdate, friendsData, friendsList, watchedMovies, setFriendsList, setFriendsData } = props


    const handleUserSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchResults = await searchUsersByName(firstNameSearch, lastNameSearch)
        setMatchingUsers(searchResults as UserProfileData[]);
    };
    

    return (
    <div className="profile">
        <div className="profile-container">
            <div className="profile-info">
                <Picture urlPath={profilePic} handleUpdate={props.handleUpdate}/>
                <div className="user-info">
                    <h1 className="name">
                        <EditableText text={firstName} field="firstName" handleUpdate={handleUpdate}/>
                        <EditableText text={lastName} field="lastName" handleUpdate={handleUpdate}/>
                    </h1>
                    <h4 className="quote">
                        <EditableText text={quote} field="quote" handleUpdate={handleUpdate}/>
                    </h4>
                </div>
            </div>
            
        <div className="friends-recently-watched">
            <div className='section-header'>
                <h4 className="recently-watched">Recently Watched</h4>
                    <hr></hr>
            </div>
            <div className="watched-list">
                <ProfileWatched movies={watchedMovies} setRecentlyWatchedData={props.setRecentlyWatchedData}/>
            </div>
        </div>
            <div className='section-header'>
                <h4 className="friends-list-container">Friends List</h4>
                    <hr></hr>
            </div>
            <div className="friends-list">
                    {props.friendsData.length === 0
                    ? <p className="text">Add friends and invite them to watch a movie!</p>
                    : <FriendsList friendsData={friendsData} friendsList={friendsList} setFriendsList={setFriendsList} setFriendsData={setFriendsData}/>
                    }
            </div>
            <div className='friend-search-container'>       
                <div className='section-header'>
                    <h4 className="user-search">Find Friends</h4>
                        <hr></hr>
                </div>
            <div>
                <FriendSearch 
                    setFirstNameSearch={setFirstNameSearch} 
                    setLastNameSearch={setLastNameSearch} 
                    handleUserSearch={handleUserSearch} 
                    matchingUsers={matchingUsers}
                    setMatchingUsers={setMatchingUsers}
                    setFriendsList={setFriendsList}
                    setFriendsData={setFriendsData}
                    friendsList={friendsList}
                    />
            </div>
            </div>
        </div>
    </div>
    )
};

