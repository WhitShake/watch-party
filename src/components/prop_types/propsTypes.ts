import { DocumentData } from "firebase/firestore";

export type userProfileData = DocumentData & {
    firstName: string
    lastName: string
    quote: string
    profilePic: string
}

export type UserData = {
    email: string
    id: string
    profilePic: string
}

export type ProfileProps = {
    userData: userProfileData | null | undefined
    friends: UserData[] | null
    watchedMovies: MovieProps[], 
    handleUpdate: (field: keyof userProfileData, value: string) => void
};

export type FriendsListProps = {friends: UserData[] | null}


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