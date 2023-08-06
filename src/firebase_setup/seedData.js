import { db } from './firebase.js';
import { collection, setDoc, doc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';


// i exported this to execute in App.tsx 
export const seedData = async (movieList) => {

    // create data to seed. Each of this will become a document in the Users collection. 
    const usersToAdd = [
        {
            username: 'alyssa123',
            data: {
                firstName: 'Alyssa',
                lastName: 'Nguyen',
                quote: 'Toto, I\'ve a feeling we\'re not in Kansas anymore.',
                profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU62Md2yC4lIg8Mt_ZUGEVBaoXR7apfYbWbQ&usqp=CAU',
            },
        },
        {
            username: 'whitney123',
            data: {
                firstName: 'Whitney',
                lastName: 'Shake',
                quote: 'I\'ll be back.',
                profilePic: 'https://i.pinimg.com/474x/23/2e/26/232e26263d527cbf1a7025e3540215be.jpg',
            },
        },
        {
            username: 'jackie123',
            data: {
                firstName: 'Jackie',
                lastName: 'Aponte',
                quote: 'There\'s no place like home.',
                profilePic: 'https://i.pinimg.com/474x/08/64/0b/08640b34412b64c5be6d0296bc6192cd.jpg',
            },
        },
        {
            username: 'ashley123',
            data: {
                firstName: 'Ashley',
                lastName: 'Yang',
                quote: 'I\'m walking here!',
                profilePic: 'https://i.pinimg.com/474x/da/9f/4a/da9f4a89b3eeefedc675aa25536235d8.jpg',
            },
        },
        {
            username: 'ansel123',
            data: {
                firstName: 'Ansel',
                lastName: 'Rognlie',
                quote: 'Meow meowmeow meOw mow!',
                profilePic: 'https://i.pinimg.com/474x/23/83/4c/23834c31e298b16f72e1e4726f96ea17.jpg',
            },
        },
    ];

    
    usersToAdd.forEach(user => {
        const newUserRef = doc(db, 'users', user.username) // use the username for the document id 
        setDoc(newUserRef, user.data)
        .then(() => {
            console.log("Document added successfully for user:", user.username)
        })
        .catch(err => {
            console.log(err)
        })
    }) 

    let playlistsToAdd = [
        {
            title: 'Funny',
            movieObject: {movies: []}
        },
        {
            title: 'Horror',
            movieObject: {movies: []}
        },
        {
            title: 'Women Leads',
            movieObject: {movies: []}
        },
        {
            title: 'Good Feels',
            movieObject: {movies: []}
        },
        {
            title: 'Dramas',
            movieObject: {movies: []}
        },
    ]

    // movieList gets passed in as an argument, which is the results of fetchMovies in App.tsx (uses popular movies endpoint)
    // basically just to automate adding a bunch of movies to each playlist 
    playlistsToAdd = playlistsToAdd.map(playlist => {
        movieList.forEach(movie => {
            playlist.movieObject.movies.push(movie)
            console.log(`Added ${movie} to ${playlist}.`)
        })
        console.log(playlist)
        return playlist
    })
    
    const usersRef = collection(db, 'users');
    const userDocs = await getDocs(usersRef)

    // go through each user, and add each playlist 
    userDocs.forEach(user => {
        playlistsToAdd.forEach(playlist => {
            const playlistDocRef = doc(db, 'users', user.id, 'Shelf', playlist.title)
            setDoc(playlistDocRef, playlist.movieObject)
            .then(() => {
                console.log(`Added ${playlist.title} to Shelf, contains ${playlist.movieObject}`)
            })
            .catch(err => {
                console.log(err)
            })
        })
    })

    // for each user, add all the other user ids as friends. make sure not to add its own user id as a friend 
    userDocs.forEach(currentUser => {
        let friendsToAdd = []
        console.log("Current user:", currentUser.id)
        userDocs.forEach(user => {
            if (user.id != currentUser.id) {
                friendsToAdd.push(user.id)
                console.log("Going to add this person as a friend:", user.id)
            }
        })
        const friendObject = {
            friends: friendsToAdd
        }
        const currentUserRef = doc(db, 'users', currentUser.id, 'Friends', 'Friends List')
        setDoc(currentUserRef, friendObject)
    })
}



// the below code is similar to the above, except with just 1 user so i could test things out 

export const testSeed = (movieList) => {
    const testData = {
        username: 'testUser123', 
        data: {
            firstName: 'Test',
            lastName: 'Fire',
            quote: 'Seeding data is great',
            profilePic: 'https://static.vecteezy.com/system/resources/previews/002/098/203/original/silver-tabby-cat-sitting-on-green-background-free-photo.jpg',
            
        }
    };

    const newDocRef = doc(db, 'users', testData.username);
    
    setDoc(newDocRef, testData.data)
    .then(() => {
        console.log("Document added successfully for user:", testData.username);
    })
    .catch(err => {
        console.log(err);
    })

    const friendsToAdd = {
        friends: ['alyssa123', 'whitney123', 'jackie123', 'ashley123', 'ansel123']
    }

    const friendsDocRef = doc(db, 'users', testData.username, 'Friends', 'Friends List')
    setDoc(friendsDocRef, friendsToAdd)
    .then(() => {
        console.log("Successfully added", friendsToAdd)
    })
    .catch(err => {
        console.log(err)
    })

    let playlistsToAdd = [
        {
            title: 'Test 1',
            movies: []
        },
        {
            title: 'Test 2',
            movies: []
        },
        {
            title: 'Test 3',
            movies: []
        },
        {
            title: 'Test 4',
            movies: []
        },
        {
            title: 'Test 5',
            movies: []
        },
    ]

    const playlists = playlistsToAdd.map(playlist => {
        console.log("processing movies:", movieList)
        movieList.forEach(movie => {
            playlist.movies.push({
                ...movie,
                addedOn: serverTimestamp()
            })
        })
        return playlist
    })

    console.log("playlists:", playlists)

}



