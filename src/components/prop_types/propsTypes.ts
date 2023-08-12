import { DocumentData } from "firebase/firestore";

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
    friends: UserProfileData[] 
    watchedMovies: MovieProps[], 
    handleUpdate: (field: keyof UserProfileData, value: string) => void
};

export type FriendsListProps = {friends: UserProfileData[]}


export type MovieProps = {
    id: number
    posterPath: string
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