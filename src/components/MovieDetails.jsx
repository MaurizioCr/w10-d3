// MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch(`http://www.omdbapi.com/?apikey=24ad60e9&i=${movieId}`)
            .then((response) => response.json())
            .then((data) => {
                setMovieDetails(data);
            })
            .catch((error) => {
                console.error('Errore nella fetch dei dettagli del film', error);
            });


        fetch(`URL delle tue API interne per i commenti del film`)
            .then((response) => response.json())
            .then((data) => {
                setComments(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Errore nella fetch dei commenti del film', error);
                setLoading(false);
            });
    }, [movieId]);

    return (
        <div>
            <h1>Movie Details</h1>
            {loading ? (

                <div>Loading...</div>
            ) : (

                <div>
                    <h2>{movieDetails.Title}</h2>
                    <img src={movieDetails.Poster} alt={movieDetails.Title} />
                    <p>{movieDetails.Plot}</p>

                    <h3>Comments</h3>
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index}>{comment.text}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;
