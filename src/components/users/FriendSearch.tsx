import './FriendSearch.css'


interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  quote: string;
  }

type FriendSearchProps = {
  setFirstNameSearch: React.Dispatch<React.SetStateAction<string>>;
  setLastNameSearch: React.Dispatch<React.SetStateAction<string>>;
  handleUserSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  matchingUsers: UserData[];
  // handleFriendshipCheck: (event: React.MouseEvent<HTMLButtonElement>, userId: string) => void;
  // handleNavigateToProfile: (event: React.MouseEvent<HTMLButtonElement>, userId: string) => void;
}

export const FriendSearch = (props: FriendSearchProps) => {

  return (
    <form onSubmit={props.handleUserSearch}>
      <div className="name-inputs">
      <div>
        <label htmlFor="firstSearch">
          <input name="firstSearch" id="firstSearch" placeholder="Enter first name" onChange={(e) => props.setFirstNameSearch(e.target.value)}/>
        </label>
      </div>
      <div>
        <label htmlFor="lastSearch">
          <input name="lastSearch" id="lastSearch" placeholder="Enter last name" onChange={(e) => props.setLastNameSearch(e.target.value)}/>
        </label>
      </div>
      </div>
      <div>
        <input type="submit" value='Search for friends' className="friend-search-button"/>
      </div>
      {props.matchingUsers.map((user) => (
        <div key={user.id}>
          <img src={user.profilePic} alt="avatar" />
          <p>{user.firstName} {user.lastName}</p>
          {/* <button>View Profile</button> */}
        </div>
      ))}
    </form>
  );
};