import { FriendsList } from './FriendsList'
import { FriendSearch } from './FriendSearch';
import { ProfileProps, UserData, UserProfileData } from '../prop_types/propsTypes';
import { auth } from '../../firebase_setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { EditableText } from './EditableText';
import { Picture } from './Picture';
import { useState, useEffect } from 'react';
// import 'firebase/firestore';
import './Profile.css'
import { ProfileWatched } from '../movie_data/ProfileWatched';
import { useNavigate } from 'react-router-dom';
import { getFriendsList, searchUsersByName } from '../../firestore_functions/firestore_calls';


export const Profile = (props: ProfileProps) => {
    if (!props.userData) {
        return (<div className="profile">Log in to see your profile!</div>)
    }

    const {firstName, lastName, profilePic, quote} = props.userData
    
    const [user] = useAuthState(auth);
    const [firstNameSearch, setFirstNameSearch] = useState('');
    const [lastNameSearch, setLastNameSearch] = useState('');
    const [matchingUsers, setMatchingUsers] = useState<UserProfileData[]>([]);
    const [friendStatus, setFriendStatus] = useState(false);

    // delete later
    useEffect(() => {
        console.log("matching users:", matchingUsers)
        const checkMatching = async () => {
            // if (!user) return;
            const friendsList = await getFriendsList(user?.uid)
            matchingUsers.map(result => {
                if (!friendsList) return;
                if (result.id in friendsList) console.log("Friended")
                else console.log("Not friended")
            })
        }
        checkMatching()
    }, [matchingUsers])

    const navigate = useNavigate();


    const handleUserSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchResults = await searchUsersByName(firstNameSearch, lastNameSearch)
        // if (searchResults) {
        // }
        setMatchingUsers(searchResults as UserProfileData[]);
    };
    

    return (
    <div className="profile">
        <div className="profile-container">
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
        {/* <div className="watched-and-friends"> */}
            <div>
            <h4>Recently Watched</h4>
            </div>
            <div className="watched-list">
                <ProfileWatched movies={props.watchedMovies}/>
                {/* {props.watchedMovies.length === 0 
                ? <p className="text">Movies you watch will show up here!</p>
                : <MovieList movies={props.watchedMovies}/>
                } */}
            </div>
            <div className="friends-list">
                <h4>Friends List</h4>
                {props.friends.length === 0
                ? <p className="text">Add friends and invite them to watch a movie!</p>
                : <FriendsList friends={props.friends}/>
                }
            </div>
            <div>
                <FriendSearch 
                    setFirstNameSearch={setFirstNameSearch} 
                    setLastNameSearch={setLastNameSearch} 
                    handleUserSearch={handleUserSearch} 
                    matchingUsers={matchingUsers}
                    // handleNavigateToProfile={handleNavigateToProfile}
                    // handleFriendshipCheck={handleFriendshipCheck}
                    />
            </div>
        </div>
    </div>
    )
};

