import { FriendSearchProps } from '../prop_types/propsTypes';
import './FriendSearch.css'
import { FriendsList } from './FriendsList';

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
          <input type="submit" value='Search!' className="friend-search-button"/>
        </div>
      </div>
      <div className="searched-friend-container">
        <FriendsList friendsData={props.matchingUsers} friendsList={props.friendsList} setFriendsList={props.setFriendsList} setFriendsData={props.setFriendsData} setMatchingUsers={props.setMatchingUsers}/>
      </div>
    </form>
  );
};