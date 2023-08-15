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
    currentUser: UserProfileData | null
}

export type FriendSearchProps = {
    setFirstNameSearch: React.Dispatch<React.SetStateAction<string>>;
    setLastNameSearch: React.Dispatch<React.SetStateAction<string>>;
    handleUserSearch: (event: React.FormEvent<HTMLFormElement>) => void;
    matchingUsers: UserProfileData[];
    setFriendsList: Dispatch<SetStateAction<Record<string, any> | undefined>>
    setFriendsData: Dispatch<SetStateAction<UserProfileData[]>>
    setMatchingUsers: Dispatch<SetStateAction<UserProfileData[]>>
    friendsList: Record<string, any> | undefined
}

export type SearchProps = {
    handleChange: React.ChangeEventHandler<HTMLInputElement>
    handleSubmit: React.FormEventHandler<HTMLFormElement>
    handleSearchSelection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedSearchForm: string
    results: {
        id: number
        posterPath: string
    }[]
    setRecentlyWatchedData: Dispatch<SetStateAction<MovieProps[]>>
}

export type MovieProps = {
    id: number
    title?: string //added title
    posterPath: string
    setRecentlyWatchedData?: Dispatch<SetStateAction<MovieProps[]>>
    handleDeletion?: (id: number, posterPath: string) => void
};

export type MovieListProps = {
    movies: MovieProps[]
    setRecentlyWatchedData: Dispatch<SetStateAction<MovieProps[]>>
    handleDeletion?: (id: number, posterPath: string) => void
}

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



export type SideBarProps = {
    shelf: string[]
    firstName: string | undefined
    lastName: string | undefined
    profilePic: string | undefined
    setShelf: Dispatch<SetStateAction<string[]>>
}

export type ShelfProps = {
    shelf: string[]
    setShelf: Dispatch<SetStateAction<string[]>>
}

export type ShelfPlaylistProps = {
    title: string
    setShelf: Dispatch<SetStateAction<string[]>>
}

export type PlaylistProps = {
    setRecentlyWatchedData: Dispatch<SetStateAction<MovieProps[]>>
}

export type MoviePageProps = {
    apiKey: string | undefined
    shelf: string[]
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

export type PosterPathFillerProps = {
    filmId: number
    fetchTitle: (id: number) => Promise<string>
}

export type RandomNumberGeneratorProps = {
    BASE_URL: string;
    randomMovieData: { id: number; posterPath: string | undefined; overview: string | undefined; voteCount: number ; popularity: number; releaseDate: string | undefined;  runtime: number; title: string | undefined; tagline: string | undefined } | null;
    setRandomMovieData: React.Dispatch<React.SetStateAction<{ id: number; posterPath: string | undefined; overview: string | undefined; voteCount: number; popularity: number; releaseDate: string | undefined;  runtime: number; title: string | undefined; tagline: string | undefined } | null>>;
} 

export interface Provider {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}

export interface ProviderObject {
    logo_path: string;
    provider_name: string
    path: string
}