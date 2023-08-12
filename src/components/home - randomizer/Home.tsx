import React, { useState } from 'react';
import './Home.css'
import RandomNumberGenerator from './RandomNumberGenerator';

type HomeProps = {
    // apiKey: string;
    BASE_URL: string;
}

export const Home = (props: HomeProps) => {

    const [randomMovieData, setRandomMovieData] = useState<{ id: number; posterPath: string | undefined; overview: string | undefined } | null>(null);
    
    return (
        <div className="number-generator">
            {/* Hello */}
        <RandomNumberGenerator 
            BASE_URL={props.BASE_URL}
            randomMovieData={randomMovieData}
            setRandomMovieData={setRandomMovieData}
            />
        </div>
    )
};