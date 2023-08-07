export type ProfileProps = {
    userData: {
        firstName: string
        lastName: string
        quote: string
        profilePic: string
    } | undefined;
};

export type FriendsListProps = {
    friends: string[]
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