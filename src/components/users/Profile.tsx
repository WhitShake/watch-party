import { MovieList } from '../movie_data/MovieList';
import { FriendsList } from './FriendsList'
import { FriendSearch } from './FriendSearch';
import { ProfileProps } from '../prop_types/propsTypes';
import { auth } from '../../firebase_setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { EditableText } from './EditableText';
import { Picture } from './Picture';
import { db } from '../../firebase_setup/firebase'
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import 'firebase/firestore';
import './Profile.css'
import { profile } from 'console';
import { ProfileWatched } from '../movie_data/ProfileWatched';
import { useNavigate } from 'react-router-dom';
import { match } from 'assert';
import { searchUsersByName } from '../../firestore_functions/firestore_calls';


interface UserData {
    key: string;
    id: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    quote: string;
    }

interface Friend {
    id: string;
}


export const Profile = (props: ProfileProps) => {
    

    const [user] = useAuthState(auth);
    const [firstNameSearch, setFirstNameSearch] = useState('');
    const [lastNameSearch, setLastNameSearch] = useState('');
    const [matchingUsers, setMatchingUsers] = useState<UserData[]>([]);
    const [friendStatus, setFriendStatus] = useState(false);

    const navigate = useNavigate();

    if (!props.userData) {
        return (<div className="profile">Log in to see your profile!</div>)
    }

    const {firstName, lastName, profilePic, quote} = props.userData

    
    
    const handleUserSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchResults = await searchUsersByName(firstNameSearch, lastNameSearch)
        if (searchResults) {
            setMatchingUsers(searchResults as UserData[]);
        }
        if (matchingUsers.length > 0) {
            const firstMatchingUser = matchingUsers[0];
            const userId = firstMatchingUser.id;
            handleFriendshipCheck(userId);
        }
    };




    //         if (matchingUsers.length > 0) {
    //             const firstMatchingUser = matchingUsers[0];
    //             const userId = firstMatchingUser.id;
    //             handleFriendshipCheck(userId);
    //         }
    //     })
    //     .catch((error) => {
    //         console.error("No users found:", error);
    //     });
    // };

    // const handleFriendshipCheck = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     if (!user) {
    //         console.log('Please sign in to use this feature')
    //         return;
    //     }
    // }

    const handleFriendshipCheck =  (userId: string) => {

        if (!user) {
            console.log('Please sign in to use this feature')
            return;
        }

        const friendsListRef = doc(db, 'users', user.uid, 'Friends', 'Friends List');

        getDoc(friendsListRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const friendsData = docSnapshot.data();
                    const friendIds: string[] = friendsData.friends;
                    console.log(friendIds)

                    const isFriend = friendIds.includes(userId);
                    console.log(isFriend)
                if (isFriend) {
                    console.log(`${userId} is already a friend`);
            }
            } else {
                console.log('Something');
            }
        })
        .catch((error) => {
            console.error('Error getting Friends list:', error)
        });
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
                {props.friends?.length === 0
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
        {/* </div> */}
        </div>
    </div>
    )
};