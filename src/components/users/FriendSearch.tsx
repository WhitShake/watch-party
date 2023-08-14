import './FriendSearch.css'
import { UserData, UserProfileData } from '../prop_types/propsTypes';
import { FriendsList } from './FriendsList';
import { Dispatch, SetStateAction } from 'react';
import { UserProfile } from 'firebase/auth';


// interface UserData {
//   id: string;
//   firstName: string;
//   lastName: string;
//   profilePic: string;
//   quote: string;
//   }

type FriendSearchProps = {
  setFirstNameSearch: React.Dispatch<React.SetStateAction<string>>;
  setLastNameSearch: React.Dispatch<React.SetStateAction<string>>;
  handleUserSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  matchingUsers: UserProfileData[];
  setFriendsList: Dispatch<SetStateAction<Record<string, any> | undefined>>
  setFriendsData: Dispatch<SetStateAction<UserProfileData[]>>
  setMatchingUsers: Dispatch<SetStateAction<UserProfileData[]>>
  friendsList: Record<string, any> | undefined
  // handleFriendshipCheck: (event: React.MouseEvent<HTMLButtonElement>, userId: string) => void;
  // handleNavigateToProfile: (event: React.MouseEvent<HTMLButtonElement>, userId: string) => void;
}

export const FriendSearch = (props: FriendSearchProps) => {

  return (
    <form onSubmit={props.handleUserSearch} className='friend-search-form'>
      <div className='all-friend-search-elements'>
        <div className="name-form-inputs">
          <div className='first-name-info'>
            <label htmlFor="firstSearch">
              <input name="firstSearch" id="firstSearch" placeholder="  Enter first name" onChange={(e) => props.setFirstNameSearch(e.target.value)}/>
            </label>
          </div>
          <div className='last-name-info'>
            <label htmlFor="lastSearch">
              <input name="lastSearch" id="lastSearch" placeholder="  Enter last name" onChange={(e) => props.setLastNameSearch(e.target.value)}/>
            </label>
          </div>
        </div>
          <div className='friend-submit'>
          <input type="submit" value='Search for friends' className="friend-search-button"/>
        </div>
      </div>
      <div className="searched-friend-container">
      {/* <button>View Profile</button> */}
        <FriendsList friendsData={props.matchingUsers} friendsList={props.friendsList} setFriendsList={props.setFriendsList} setFriendsData={props.setFriendsData} setMatchingUsers={props.setMatchingUsers}/>
      </div>
    </form>
  );
};