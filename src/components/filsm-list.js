import { useState } from "react";
import Wrapper from "../UI/wrapper";
import styles from './films-list.module.css'

const FilmsList = () => {
    const [filmList, setFilmList] = useState([]);

    const addFilmHandler = () => {
        if (filmName != '') {
            setFilmList([...filmList, filmName]);
            setFilmName('');
        }
    }
    
    const [filmName, setFilmName] = useState('');

    const filmNameHandler = (event) => {
        setFilmName(event.target.value);
    }

    const deleteHandler = (index) => {
        setFilmList(filmList.filter((film, i) => i != index));
    }


    return (
        <Wrapper>
            <h2>Films List</h2>
            <div className={styles.row}>
                <input type="text" value={filmName} onChange={filmNameHandler}/>
                <button onClick={addFilmHandler}>Add film</button>
            </div>
            <ul className={styles.list}>
                {filmList.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => deleteHandler(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </Wrapper>
    );
};

export default FilmsList;