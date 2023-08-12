import React, { useEffect, useState } from "react"
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

  const generateRandomNumber = () => {
    setRandomNumber(null);
    const min = 2;
    const max = 1152323;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
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
        if (data.success ===false || 
          !data.poster_path || 
          !data.vote_count || 
          !data.overview ||
          data.popularity < 10
          ) {
          generateRandomNumber();
        } else {
            const randomMovieData = { id: data.id , posterPath: data.poster_path, overview: data.overview, voteCount: data.vote_count, popularity: data.popularity }
            props.setRandomMovieData(randomMovieData)
        }
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
