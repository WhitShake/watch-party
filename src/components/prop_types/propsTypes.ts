import { Dispatch, SetStateAction } from "react"

export type UserProfileData = {
    id: string
    firstName: string
    lastName: string
    quote: string
    profilePic: string
    email: string
}

export type UserData = {
    email: string
    id: string
    profilePic: string
}

export type ProfileProps = {
    userData: UserProfileData | null | undefined
    friendsData: UserProfileData[] 
    friendsList: Record<string, any> | undefined
    watchedMovies: MovieProps[], 
    handleUpdate: (field: keyof UserProfileData, value: string) => void
    setFriendsList: Dispatch<SetStateAction<Record<string, any> | undefined>>
    setFriendsData: Dispatch<SetStateAction<UserProfileData[]>>
    setRecentlyWatchedData: Dispatch<SetStateAction<MovieProps[]>>
};

export type ProfileWatchedProps = {
    movies: MovieProps[]
    setRecentlyWatchedData: Dispatch<SetStateAction<MovieProps[]>>
}

export type FriendsListProps = {
    friendsData: UserProfileData[]
    friendsList: Record<string, any> | undefined
    setFriendsList: Dispatch<SetStateAction<Record<string, any> | undefined>>
    setFriendsData: Dispatch<SetStateAction<UserProfileData[]>>
    setMatchingUsers?: Dispatch<SetStateAction<UserProfileData[]>>
}

export type FriendProps = {
    data: UserProfileData
    friendsList: {} | undefined
    setFriendsList: Dispatch<SetStateAction<Record<string, any> | undefined>>
    setFriendsData: Dispatch<SetStateAction<UserProfileData[]>>
    setMatchingUsers?: Dispatch<SetStateAction<UserProfileData[]>>
}

export type FriendPageProps = {
    friendsList: {} | undefined
    setFriendsList: Dispatch<SetStateAction<Record<string, any> | undefined>>
    setFriendsData: Dispatch<SetStateAction<UserProfileData[]>>
    setRecentlyWatchedData: Dispatch<SetStateAction<MovieProps[]>>
}

export type MovieProps = {
    id: number
    posterPath: string
    setRecentlyWatchedData?: Dispatch<SetStateAction<MovieProps[]>>
};

export type MovieObject = {
    id: number
    original_language: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
};

export type MovieListProps = {
    movies: MovieProps[]
    setRecentlyWatchedData: Dispatch<SetStateAction<MovieProps[]>>
}

export type SideBarProps = {
    signedInStatus: boolean
    shelf: string[]
    firstName: string | undefined
    lastName: string | undefined
    profilePic: string | undefined
    setPlaylistTitle: (currentPlaylist: string) => void
    setPlaylistPage: (playlistPage: string) => void
    setShelf: Dispatch<SetStateAction<string[]>>
}

export type ShelfProps = {
    shelf: string[]
    setPlaylistTitle: (currentPlaylist: string) => void
    setPlaylistPage: (playlistPage: string) => void
    setShelf: Dispatch<SetStateAction<string[]>>
}

export type ShelfPlaylistProps = {
    title: string
    setPlaylistTitle: (currentPlaylist: string) => void
    setPlaylistPage: (playlistPage: string) => void 
    setShelf: Dispatch<SetStateAction<string[]>>
}

export type PlaylistProps = {
    setRecentlyWatchedData: Dispatch<SetStateAction<MovieProps[]>>
}

export type MoviePageProps = {
    apiKey: string | undefined
    shelf: string[]
    // do i need set playlist movies in here? 
}

export type MovieDetails = {
    genres: Genre[];
    original_title: string;
    overview: string;
    release_date: string;
    runtime: number;
    tagline: string;
    poster_path: string;
}

export type Genre = {
    id: number;
    name: string;
}