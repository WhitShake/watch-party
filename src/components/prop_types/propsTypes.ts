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
};

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
}

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