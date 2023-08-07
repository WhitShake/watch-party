import { DocumentData } from "firebase/firestore";

export type userProfileData = DocumentData & {
    firstName: string
    lastName: string
    quote: string
    profilePic: string
}

export type ProfileProps = {
    userData: userProfileData | null | undefined
    friends: {
        id: string
        profilePic: string
    }[] | null
};

export type FriendsListProps = Pick<ProfileProps, 'friends'>;


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