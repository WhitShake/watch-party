import { useEffect, useState } from "react";
import './PosterPathFiller.css'
import { PosterPathFillerProps } from "../prop_types/propsTypes";

export const PosterPathFiller = ({ filmId, fetchTitle }: PosterPathFillerProps) => {

  const [movieTitle, setMovieTitle] = useState<string | null>(null);

  useEffect(() => {
    fetchTitle(filmId).then((original_title: string) => {
      setMovieTitle(original_title);
    });
  }, [filmId, fetchTitle]);


  return (
    <div className="filler-movie-container">
    <div className="poster-filler"><b>{movieTitle}</b></div>
    </div>
  )
}