import { useState } from "react";
import Wrapper from "../UI/wrapper";
import styles from './list-movies-filtered.module.css'

const ListMoviesFiltered = () => {
    const movies = [
        { title: 'Inception', genre: 'Sci-Fi' },
        { title: 'Titanic', genre: 'Drama' },
        { title: 'The Hangover', genre: 'Comedy' },
        { title: 'Interstellar', genre: 'Sci-Fi' },
        { title: 'The Godfather', genre: 'Drama' },
        { title: 'Superbad', genre: 'Comedy' }
    ];

    const [moviesList, setMoviesList] = useState(movies);

    const genres = [...new Set(movies.map(item => item.genre)), 'All'];

    const filterHandler = (genre) => {
        if (genre === 'All') {
            console.log('all');
            setMoviesList(movies);
        } else {
            setMoviesList(movies.filter(item => item.genre === genre));
        }
    }

    return (
        <Wrapper>
            <h2>List movies filtered</h2>
            <div className='holder'>
                <span>Filter by:</span>
                <ul className={styles['button-list']}>
                    {genres.map((item, index) => (
                        <li key={index}>
                            <button onClick={() => filterHandler(item)}>{item}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <ul className={styles.list}>
                {moviesList.map((item, index) => (
                    <li key={index}>
                        {item.title}
                        <div>
                            <b> {item.genre}</b>
                        </div>
                    </li>
                ))}
            </ul>
        </Wrapper>
    );
};

export default ListMoviesFiltered;