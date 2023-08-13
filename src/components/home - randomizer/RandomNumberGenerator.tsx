import React, { useEffect, useState } from "react"
// import { fetchRandomMovieId } from "../../firestore_functions/firestore_calls"
import './RandomNumberGenerator.css'


type RandomNumberGeneratorProps = {
  BASE_URL: string;
  randomMovieData: { id: number; posterPath: string | undefined; overview: string | undefined; voteCount: number ; popularity: number } | null;
  setRandomMovieData: React.Dispatch<React.SetStateAction<{ id: number; posterPath: string | undefined; overview: string | undefined; voteCount: number; popularity: number } | null>>;
}

// React.FC


const RandomNumberGenerator = (props: RandomNumberGeneratorProps) => {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const {BASE_URL} = props;

  const randomMovies: number[] = [
    299536, 812225, 626332, 414906, 507086, 324786, 675353, 1064835, 536554, 804150,
    714669, 361743, 879444, 22620, 646389, 283366, 930094, 13, 671, 961323, 994143,
    799379, 616037, 672, 14836, 98566, 985939, 766507, 585083, 585511, 960258, 438695,
    9072, 238, 453395, 157336, 597, 354912, 19995, 649609, 585, 862, 785084, 278,
    851644, 989937, 155, 724495, 438631, 265712, 49046, 668482, 120, 439079, 106646,
    557, 747188, 129, 4935, 588228, 122, 122917, 752623, 121, 524434, 497, 329865,
    68726, 642885, 458156, 22881, 545611, 131631, 4248, 624860, 184345, 4247, 680,
    447362, 818397, 615173, 4348, 11824, 745391, 396535, 857, 1646, 926008337339,
    451048, 20982, 661374, 232672, 496243, 348, 38365, 62177, 9479, 373571, 85,
    520763, 960704, 75780, 679, 290098, 39108, 381288, 218, 207703, 49051, 539,
    284054, 425909, 869626, 257344, 10625, 262500, 27578, 210577, 564, 18, 562, 1359,
    577922, 370172
  ];
  
  const generateRandomNumber = () => {
    setRandomNumber(null);
    const randomIndex = Math.floor(Math.random() * randomMovies.length)
    const random = randomMovies[randomIndex]
    setRandomNumber(random);
  };



  useEffect(() => {
    const fetchRandomMovie = async (movieId: number) => {
      const apiKey = process.env.REACT_APP_tmdb_apiKey;
      console.log("API key:", apiKey)
      const url = `${props.BASE_URL}3/movie/${movieId}?api_key=${apiKey}`

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const randomMovieData = { id: data.id , posterPath: data.poster_path, overview: data.overview, voteCount: data.vote_count, popularity: data.popularity }
        props.setRandomMovieData(randomMovieData)

      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
    if (randomNumber !== null) {
      fetchRandomMovie(randomNumber);
    }
  }, [randomNumber, BASE_URL]);


  return (
    <div className="random-container">
      <div className="generator-container">
        <button onClick={generateRandomNumber}>I'm Feeling Lucky!</button>
        <div className="random-info">
          {props.randomMovieData && props.randomMovieData.posterPath && (
            <img className="movie-poster" src={`http://image.tmdb.org/t/p/w185${props.randomMovieData.posterPath}`} alt="movie poster"/>
          )}
          
          <div>
            {props.randomMovieData && props.randomMovieData.posterPath && (
            <p>{props.randomMovieData.overview}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomNumberGenerator;
