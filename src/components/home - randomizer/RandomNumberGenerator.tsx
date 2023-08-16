import React, { useEffect, useState } from "react"
import './RandomNumberGenerator.css'
import { WatchProviderIcons } from "./WatchProviderIcons";
import { Link } from "react-router-dom";
import { Provider, ProviderObject, RandomNumberGeneratorProps } from "../prop_types/propsTypes";
import { providerInfo } from "../movie_data/WatchProvidersInfo";

const apiKey = process.env.REACT_APP_tmdb_apiKey;



const RandomNumberGenerator = (props: RandomNumberGeneratorProps) => {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [watchProvidersList, setWatchProvidersList] = useState<ProviderObject[]>([]);
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


  const fetchWatchProviders = (movieId: number) => {
    let watchProviders: ProviderObject[] = []
    const url = `${BASE_URL}3/movie/${movieId}/watch/providers?api_key=${apiKey}`

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.US && data.results.US.flatrate) {
          data.results.US.flatrate.forEach((watchProvider: Provider) => {
            if (watchProvider.provider_id in providerInfo) {
              const path = providerInfo[watchProvider.provider_id]
              watchProviders.push({
                logo_path: watchProvider.logo_path,
                provider_name: watchProvider.provider_name,
                path: path
              })
            }
          })
        setWatchProvidersList(watchProviders)
        }
      })

      .catch(error => {
        console.error('Error fetching watch providers:', error);
      });
  };

  useEffect(() => {
    const fetchRandomMovie = async (movieId: number) => {
      const apiKey = process.env.REACT_APP_tmdb_apiKey;
      console.log("API key:", apiKey)
      const url = `${props.BASE_URL}3/movie/${movieId}?api_key=${apiKey}`

      try {
        const response = await fetch(url);
        const data = await response.json();
        const randomMovieData = { id: data.id , posterPath: data.poster_path, overview: data.overview, voteCount: data.vote_count, popularity: data.popularity, releaseDate: data.release_date,  runtime: data.runtime, title: data.title, tagline: data.tagline}
        props.setRandomMovieData(randomMovieData)

      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
    if (randomNumber !== null) {
      fetchRandomMovie(randomNumber);
      fetchWatchProviders(randomNumber);
    }
  }, [randomNumber, BASE_URL]);


  return (
    <div className="random-container">
      <h1 className="headline">WATCH PARTY</h1>
      <div className="sub-head"><p>Films and Friends</p></div>
      <div className="generator-container">
        <div className="why-watch-party">
          <p className="A">Sick of scrolling? </p>
          <p className="B">Seeking something new?</p>
        </div>
        <button id="lucky-button" onClick={generateRandomNumber}>I'm Feeling Lucky!</button>
        <div className="random-movie-display">
          <Link to={`/movie-details/${props.randomMovieData?.id}`}><h3 className="random-title-link">{props.randomMovieData && props.randomMovieData.title}</h3></Link>
          <div className="random-movie-results">
            <div className="random-poster">
              {props.randomMovieData && props.randomMovieData.posterPath && (
                <img className="random-movie-poster" src={`http://image.tmdb.org/t/p/w185${props.randomMovieData.posterPath}`} alt="movie poster"/>
              )}
            </div>

            <div className="random-movie-information">
              <div className="random-details">
                  {props.randomMovieData && <p className='tagline'> {props.randomMovieData.tagline}</p>}
                <div className="random-overview">
                    {props.randomMovieData && props.randomMovieData.overview && (
                    <div>
                        <h4 className='info-header'>Overview: </h4>
                        <p>{props.randomMovieData.overview}</p>
                    </div>
                    )}
                </div>
                <div className="random-tidbits">
                  
                  {props.randomMovieData && props.randomMovieData.releaseDate && (
                  <div className="random-specs">
                    <h5 className='line-info'>Released:</h5>
                    <p className="random-details-child">{props.randomMovieData.releaseDate.slice( 0, 4 )}</p>
                  </div>
                  )}
                  
                  {props.randomMovieData && props.randomMovieData.runtime && (
                    <div className="random-specs">
                      <h5 className='line-info'>Runtime:</h5>
                      <p className="random-details-child">{props.randomMovieData.runtime} mins</p>
                    </div>
                  )}
                </div>

                <div className="provider-image-gallery">  
                      {props.randomMovieData && watchProvidersList && 
                        <WatchProviderIcons providers={watchProvidersList}/> }
                </div>
              </div>



              {/* <div>
                  {props.randomMovieData && props.randomMovieData.id && (
                    <Link to= {`/movie-details/${props.randomMovieData.id}`}>View More Details</Link>
                  )}
              </div> */}
            </div>
          </div>


        </div>

      </div>
      <footer></footer>

    </div>
  );
};

export default RandomNumberGenerator;
